import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard';
import './EventGrid.css';


const EventGrid = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

useEffect(() => {
  const fetchEvents = async () => {
    try {
      const eventResponse = await fetch('http://localhost:8080/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const eventData = await eventResponse.json();
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to empty array if fetch fails
      setEvents([]);
    }
  };

  fetchEvents();
}, []);

const handleFilter = async(category) => {
  try{
    setActiveFilter(category);
    if(category === 'All') {
      const allEvents = await fetch('http://localhost:8080/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const allData = await allEvents.json();
      setEvents(allData);
  
    }

    else {
      const filteredEvents = await fetch(`http://localhost:8080/events_by_category?category=${category.toLowerCase()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const filteredData = await filteredEvents.json();
    setEvents(filteredData);

  }
  
  console.log('Filter by:', category);
} catch (error) {
    console.error('Error filtering events:', error);
  }
};



  return (
    <div className="event-grid-container">
      <div className="hero-section">
        <h1>Discover Amazing Events</h1>
        <p>Find and book the perfect experiences near you</p>
      </div>
      <div className="filter-pills">
        <button className={`filter-pill ${activeFilter === 'All' ? 'active' : ''}`} onClick={() => handleFilter('All')}>All</button>
        <button className={`filter-pill ${activeFilter === 'Music' ? 'active' : ''}`} onClick={() => handleFilter('Music')}>Music</button>
        <button className={`filter-pill ${activeFilter === 'Food' ? 'active' : ''}`} onClick={() => handleFilter('Food')}>Food</button>
        <button className={`filter-pill ${activeFilter === 'Technology' ? 'active' : ''}`} onClick={() => handleFilter('Technology')}>Technology</button>
        <button className={`filter-pill ${activeFilter === 'Art' ? 'active' : ''}`} onClick={() => handleFilter('Art')}>Art</button>
        <button className={`filter-pill ${activeFilter === 'Sports' ? 'active' : ''}`} onClick={() => handleFilter('Sports')}>Sports</button>
        <button className={`filter-pill ${activeFilter === 'Others' ? 'active' : ''}`} onClick={() => handleFilter('Others')}>Others</button>
      </div>

      <div className="events-grid">
        {Array.isArray(events) && events.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onSelect={() => navigate(`/events`, {state: {selectedEvent: event}})}
          />
        ))}
      </div>
    </div>
  );
}

export default EventGrid;
