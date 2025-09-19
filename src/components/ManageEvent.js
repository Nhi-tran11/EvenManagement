import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageEvent.css';


const ManageEvent = () => {
  const navigate = useNavigate();
  const [eventsData, setEventsData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [err, setError] = useState(null);
  const [simplifiedAttendees, setSimplifiedAttendees] = useState([]);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString();
  };
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/current_user', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setCurrentUser(data);
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching current user:', error);
      }
    };
    fetchCurrentUser();
  }, []);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const EventResponse = await fetch(`http://localhost:8080/event_management?userId=${currentUser.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: currentUser.id
          })
        });
        const EventsData = await EventResponse.json();
        setEventsData(EventsData);
        console.log('Events data:', EventsData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching events data:', error);
      }
    };

    if (currentUser) {
      fetchBookings();
    }
  }, [currentUser]);
  useEffect(() => {
    const attendeesData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/attendee_information?eventCreatedBy=${currentUser.id}`, {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            eventCreatedBy: currentUser.id
          })
        });
        const data = await response.json();
        console.log('Attendees data:', data);
        const groupedByEvent = data.reduce((acc, item) => {
          const eventId = item.event.id;

          if (!acc[eventId]) {
            acc[eventId] = {
              eventId: eventId,
              attendees: []
            };
          }

          acc[eventId].attendees.push({
            phoneNumber: item.phoneNumber,
            specialRequest: item.specialRequest,
            ticketsBooked: item.ticketsBooked,
            userName: item.userName,
            userId: item.userId
          });

          return acc;
        }, {});

        const result = Object.values(groupedByEvent);
        setSimplifiedAttendees(result);
        console.log('Simplified Attendees:', result);

      } catch (error) {
        setError(error.message);
        console.error('Error fetching attendees data:', error);
      }
    };
    if (currentUser?.id) {
      attendeesData();
    }
  }, [currentUser]);
  function downloadJSON(filename, jsonData) {
    // Convert JSON to a string
    const jsonStr = JSON.stringify(jsonData, null, 2); // pretty print with indentation
    // Create a blob with the JSON content
    const blob = new Blob([jsonStr], { type: "application/json" });
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    // Trigger the download
    link.click();
    // Release the object URL
    URL.revokeObjectURL(link.href);
  }

  return (
    <div className="event-grid-container">
      {currentUser === null ? (
        <p>
          🔒 Please{' '}
          <button className="login-link" onClick={() => navigate('/login')}>
            log in
          </button>{' '}
          to see your bookings
        </p>
      ) : (
        <>
          <div className="hero-section">
            <h1>Manage My events</h1>
          </div>
          <div className="events-grid">
            {Array.isArray(eventsData) && eventsData.length > 0 ? (
              eventsData.map((event, index) => {
                const ticketsRemaining = event.quantity;

                return (
                  <div key={index} className="event-card">
                    <div className="card-image-container">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="card-image"
                      />
                    </div>

                    <div className="card-content">
                      <h3 className="event-title">{event.title}</h3>
                      <div className="event-meta">
                        <div className="meta-item">
                          <span className="meta-icon">📅</span>
                          <span>
                            {formatDate(event.date)} • {event.time}
                          </span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-icon">📍</span>
                          <span>{event.location}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-icon">👥</span>
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>

                      <p className="event-description">{event.description}</p>

                      <p className="booked-btn">
                        Number of tickets is Remaining({ticketsRemaining})
                      </p>

                      <div className="booking-info">
                        <button
                          className="download-btn"
                          onClick={() => {
                            const eventAttendees = simplifiedAttendees.find(acc => acc.eventId === event.id);
                            if (eventAttendees && eventAttendees.attendees.length > 0) {
                              downloadJSON(`attendees_${event.title.replace(/\s+/g, '_')}.json`, eventAttendees.attendees);
                            } else {
                              alert('No attendees data available for this event');
                            }
                          }}
                        >
                          Download Attendees List ({simplifiedAttendees.find(acc => acc.eventId === event.id)?.attendees?.length || 0})
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })
            ) : (
              <p>No events found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ManageEvent;
