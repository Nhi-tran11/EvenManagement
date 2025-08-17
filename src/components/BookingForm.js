import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tickets: 1,
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get the selected event from localStorage
    const selectedEvent = localStorage.getItem('selectedEvent');
    if (selectedEvent) {
      setEvent(JSON.parse(selectedEvent));
    } else {
      // If no event is selected, redirect to home
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsSubmitting(false);
      alert('🎉 Booking confirmed! Check your email for tickets.');
      // Clear the selected event and navigate home
      localStorage.removeItem('selectedEvent');
      navigate('/');
    }, 2000);
  };

  const handleBackClick = () => {
    // Navigate back to event details
    navigate('/event-details');
  };

  if (!event) return null;

  const totalPrice = event.price * formData.tickets;
  const serviceFee = Math.round(totalPrice * 0.1);
  const finalTotal = totalPrice + serviceFee;

  return (
    <div className="booking-form-container">
      <div className="booking-header">
        <button className="back-btn" onClick={handleBackClick}>
          ← Back to Event
        </button>
        <h1>Complete Your Booking</h1>
      </div>

      <div className="booking-content">
        <div className="booking-main">
          <div className="event-summary">
            <img src={event.image} alt={event.title} className="summary-image" />
            <div className="summary-details">
              <h3>{event.title}</h3>
              <div className="summary-meta">
                <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                <span>🕐 {event.time}</span>
                <span>📍 {event.location}</span>
              </div>
            </div>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>👤 Contact Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>🎫 Ticket Selection</h3>
              <div className="ticket-selector">
                <label htmlFor="tickets">Number of Tickets</label>
                <div className="ticket-controls">
                  <button 
                    type="button" 
                    className="ticket-btn"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      tickets: Math.max(1, prev.tickets - 1) 
                    }))}
                  >
                    −
                  </button>
                  <span className="ticket-count">{formData.tickets}</span>
                  <button 
                    type="button" 
                    className="ticket-btn"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      tickets: Math.min(10, prev.tickets + 1) 
                    }))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>💬 Special Requests</h3>
              <div className="form-group">
                <label htmlFor="specialRequests">Additional Information (Optional)</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                  rows="4"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="booking-sidebar">
          <div className="price-breakdown">
            <h3>💰 Price Breakdown</h3>
            <div className="price-item">
              <span>Ticket Price (${event.price} × {formData.tickets})</span>
              <span>${totalPrice}</span>
            </div>
            <div className="price-item">
              <span>Service Fee</span>
              <span>${serviceFee}</span>
            </div>
            <div className="price-divider"></div>
            <div className="price-total">
              <span>Total</span>
              <span>${finalTotal}</span>
            </div>
          </div>

          <div className="payment-section">
            <h3>💳 Payment Method</h3>
            <div className="payment-options">
              <div className="payment-option active">
                <span>💳 Credit Card</span>
                <span>Visa, Mastercard, Amex</span>
              </div>
              <div className="payment-option">
                <span>📱 Digital Wallet</span>
                <span>Apple Pay, Google Pay</span>
              </div>
            </div>
          </div>

          <div className="booking-guarantee">
            <h4>🛡️ Booking Guarantee</h4>
            <ul>
              <li>✅ Instant confirmation</li>
              <li>✅ Mobile tickets</li>
              <li>✅ Free cancellation up to 24h</li>
              <li>✅ Customer support 24/7</li>
            </ul>
          </div>

          <button 
            type="submit" 
            form="booking-form"
            className={`confirm-booking-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <span>🔄 Processing...</span>
            ) : (
              <span>🎉 Confirm Booking - ${finalTotal}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
