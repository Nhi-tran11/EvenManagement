import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
   const selectedEvent = localStorage.getItem('selectedEvent');
   const [current_user, setCurrentUser] = useState(null);
   const [error, setError] = useState(null);
      
    const ticketQuantity=JSON.parse(selectedEvent).quantity;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    ticketsBooked: 0,
    specialRequest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
          setFormData(prev => ({
            ...prev,
            email: data.email || '',
          }));
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      setError(error.message);
    }

  }; fetchCurrentUser();
}, []);

  useEffect(() => {
  
    if (selectedEvent) {
      setEvent(JSON.parse(selectedEvent));
    } else {
      // If no event is selected, redirect to home
      
      navigate('/');
    }
  }, [selectedEvent]);

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
 try{
  if(formData.ticketsBooked === 0 || formData.userName === '' || formData.phoneNumber === ''){
    setError('Please fill in all required fields and select at least one ticket.');
    setIsSubmitting(false);
    return;
  }
    const bookingData = await fetch('http://localhost:8080/bookedEvent',{
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event: event,
        userId: current_user.id,
        userName: `${formData.firstName} ${formData.lastName}`,
        ...formData
      })
     
    })
    const bookingResponse = await bookingData.json();
    if(bookingData.ok){
      setTimeout(() => {
      alert('🎉 Booking confirmed! Check your email for tickets.');
      // Clear the selected event and navigate home
      localStorage.removeItem('selectedEvent');
      navigate('/');
    }, 2000);
    }
  } catch (error) {
    console.error(error.message);
    setError(error.message);
    setIsSubmitting(false);
    return;
  }

    
  };

  const handleBackClick = () => {
    // Navigate back to event details
    navigate('/event-details');
  };

  if (!event) return null;

  const totalPrice = event.price * formData.ticketsBooked;
  const serviceFee = Math.round(totalPrice * 0.1);
  const finalTotal = totalPrice + serviceFee;

  return (
    <div className="booking-form-container">
      <div className="booking-header">
        <button className="back-btn" onClick={handleBackClick}>
          ← Back to Event
        </button>
        {error && <p className="error-message">{error}</p>}
        <h1>Complete Your Booking</h1>
      </div>
    {!current_user && (
    
        <p>🔒 Please <button className="login-link" onClick={() => navigate('/login')}>log in</button> to proceed with booking.</p>
      )}
      <div className="booking-content">
        <div className="booking-main">
          <div className="event-summary">
            <img src={event.imageUrl} alt={event.title} className="summary-image" />
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
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  required 
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
                      ticketsBooked: Math.max(0, prev.ticketsBooked - 1) 
                    }))}
                  >
                    −
                  </button>
                  <span className="ticket-count">{formData.ticketsBooked}</span>
                  <button 
                    type="button" 
                    className="ticket-btn"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      ticketsBooked: Math.min(ticketQuantity, prev.ticketsBooked + 1) 
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
                  value={formData.specialRequest}
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
              <span>Ticket Price (${event.price} × {formData.ticketsBooked})</span>
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
                <form>
            <div>
              <label>Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" required />
            </div>
            <div>
              <label>Expiry Date</label>
              <input type="text" placeholder="MM/YY" required />
            </div>
            <div>
              <label>CVV</label>
              <input type="password" placeholder="123" required />
            </div>
          </form>
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
          {current_user && (
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
          </button>)}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
