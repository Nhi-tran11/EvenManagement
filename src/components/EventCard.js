import React from 'react';
import './EventCard.css';

const EventCard = ({ event, onSelect }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Music': '#ff6b6b',
      'Food': '#feca57',
      'Technology': '#48dbfb',
      'Art': '#ff9ff3',
      'Fitness': '#54a0ff',
      'Entertainment': '#5f27cd'
    };
    return colors[category] || '#ddd';
  };

  return (
    <div className="event-card" onClick={onSelect}>
      <div className="card-image-container">
        <img src={event.image} alt={event.title} className="card-image" />
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
          <button className="book-btn">
            Book Now
          </button>
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
