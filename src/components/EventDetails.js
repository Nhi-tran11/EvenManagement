import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Get the selected event from localStorage
    const selectedEvent = localStorage.getItem('selectedEvent');
    if (selectedEvent) {
      console.log('Selected event data:', selectedEvent);
      setEvent(JSON.parse(selectedEvent));
    } else {
      // If no event is selected, redirect to home
      navigate('/');
    }
  }, [navigate]);

  const handleBookClick = () => {
    // Navigate to booking page
    navigate('/booking');
  };

  const handleBackClick = () => {
    // Navigate back to events grid
    localStorage.removeItem('selectedEvent');
    navigate('/');
    
  };

  if (!event) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
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
    return colors[category];
  };

  return (
    <div className="event-details-container">
      <div className="details-header">
        <button className="back-btn" onClick={handleBackClick}>
          ← Back to Events
        </button>
      </div>

      <div className="event-hero">
        <div className="hero-image-container">
          <img src={event.imageUrl} alt={event.title} className="hero-image" />
          <div className="hero-overlay">
            <span className="hero-category" style={{backgroundColor: getCategoryColor(event.category)}}>
              {event.category}
            </span>
          </div>
        </div>
        
        <div className="hero-content">
          <h1 className="event-title">{event.title}</h1>
          <div className="event-meta-grid">
            <div className="meta-card">
              <span className="meta-icon">📅</span>
              <div>
                <div className="meta-label">Date</div>
                <div className="meta-value">{formatDate(event.date)}</div>
              </div>
            </div>
            <div className="meta-card">
              <span className="meta-icon">🕐</span>
              <div>
                <div className="meta-label">Time</div>
                <div className="meta-value">{event.time}</div>
              </div>
            </div>
            <div className="meta-card">
              <span className="meta-icon">📍</span>
              <div>
                <div className="meta-label">Location</div>
                <div className="meta-value">{event.location}</div>
              </div>
            </div>
            <div className="meta-card">
              <span className="meta-icon">👥</span>
              <div>
                <div className="meta-label">Attendees</div>
                <div className="meta-value">{event.attendees} going</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="event-content">
        <div className="content-main">
          <section className="description-section">
            <h2>About This Event</h2>
            <p>{event.description}</p>
            <p>
              This amazing event promises to be an unforgettable experience filled with excitement, 
              networking opportunities, and memories that will last a lifetime. Join fellow enthusiasts 
              and discover something new while connecting with like-minded individuals.
            </p>
          </section>

          <section className="highlights-section">
            <h2>Event Highlights</h2>
            <div className="highlights-grid">
              <div className="highlight-item">
                <span className="highlight-icon">🌟</span>
                <span>Premium Experience</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🎁</span>
                <span>Special Surprises</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🤝</span>
                <span>Networking Opportunities</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">📸</span>
                <span>Photo Opportunities</span>
              </div>
            </div>
          </section>

          <section className="location-section">
            <h2>Location & Directions</h2>
            <div className="location-info">
              <div className="location-details">
                <h3>{event.location}</h3>
                <p>Easy access via public transportation and parking available nearby.</p>
              </div>
              <div className="map-placeholder">
                <div className="map-icon">🗺️</div>
                <span>Interactive Map</span>
              </div>
            </div>
          </section>
        </div>

        <div className="content-sidebar">
          <div className="booking-card">
            <div className="price-display">
              <span className="price">${event.price}</span>
              <span className="price-label">per person</span>
            </div>
            {event && event.quantity === 0 && (
              <div className="sold-out-banner">
                This event is currently sold out.
              </div>
            )}
            {event.quantity>0 && (
            <button className="book-now-btn" onClick={handleBookClick}>
              Book Your Spot Now
            </button>)}
            
            <div className="booking-features">
              <div className="feature">✅ Instant Confirmation</div>
              <div className="feature">✅ Mobile Tickets</div>
              <div className="feature">✅ Free Cancellation</div>
            </div>
            
            <div className="social-proof">
              <div className="avatars">
                <div className="avatar">👤</div>
                <div className="avatar">👥</div>
                <div className="avatar">👨</div>
                <div className="more-count">+{event.attendees - 3}</div>
              </div>
              <span className="social-text">people are attending</span>
            </div>
          </div>

          <div className="share-card">
            <h3>Share this event</h3>
            <div className="share-buttons">
              <button className="share-btn">📱 Share</button>
              <button className="share-btn">❤️ Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
