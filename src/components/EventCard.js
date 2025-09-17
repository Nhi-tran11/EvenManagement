import React from 'react';
import './EventCard.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(0);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  useEffect(() => {
    const check_tickets = async () => {
      try {
        const response = await fetch(`http://localhost:8080/book_event_alert?id=${event.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const ticketsresponse = await response.json();
        console.log('Tickets response:', ticketsresponse);
        setTickets(ticketsresponse.quantity);
        console.log('Tickets available:', ticketsresponse.quantity);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setTickets(0);
      } 
    };
    check_tickets();
  }, []); // Empty dependency array makes this run only once when component mounts

  

  const getCategoryColor = (category) => {
    const colors = {
      'Music': '#ff6b6b',
      'Food': '#feca57',
      'Technology': '#48dbfb',
      'Art': '#ff9ff3',
      'Fitness': '#54a0ff',
      'Entertainment': '#5f27cd'
    };
    return colors[category];
  };
  const onSelect = () => {
    localStorage.setItem('selectedEvent', JSON.stringify(event));
    navigate('/event-details');
  }

  return (
    <div className="event-card" onClick={onSelect}>
      <div className="card-image-container">
        <img src={event.imageUrl} alt={event.title} className="card-image" />
        <div className="card-overlay">
          <span className="category-tag" style={{backgroundColor: getCategoryColor(event.category)}}>
            {event.category}
          </span>
          <div className="price-tag">
            ${event.price}
          </div>
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="event-title">{event.title}</h3>
        <div className="event-meta">
          <div className="meta-item">
            <span className="meta-icon">📅</span>
            <span>{formatDate(event.date)} • {event.time}</span>
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
        
        <div className="card-actions">
          {tickets > 0 && (
            <button className="book-btn">
              Book Now
            </button>
          )}
          {tickets === 0 && (
            <button className="sold-out-btn" >
              Sold Out
            </button>
          )}
          <div className="card-stats">
            <span className="likes">❤️ 24</span>
            <span className="shares">📤 8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
