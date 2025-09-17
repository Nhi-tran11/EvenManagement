import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageEvent.css';


const ManageEvent = () => {
  const navigate = useNavigate();
  const [eventsData, setEventsData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString();
  };
useEffect(()=>{
    const fetchCurrentUser = async() => {
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
            console.error('Error fetching current user:', error);
        }
    };
    fetchCurrentUser();
}, []);
useEffect(()=>{
    const fetchBookings = async() =>{
        try{
            const EventResponse = await fetch(`http://localhost:8080/event_management?userId=${currentUser.id}`,{
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
            console.error('Error fetching Events:', error);
        }
    };

    if (currentUser) {
        fetchBookings();
    }
}, [currentUser]);
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
{/* 
                      <div className="booking-info">
                        <p>
                          <strong>Booked by:</strong> {event.userName}
                        </p>
                        <p>
                          <strong>Phone:</strong> {event.phoneNumber}
                        </p>
                      </div> */}
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
