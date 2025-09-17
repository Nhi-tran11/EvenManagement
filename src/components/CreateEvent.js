import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';
import { useEffect } from 'react';
const CreateEvent = () => {
  const navigate = useNavigate();
  const [current_user, setCurrentUser] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
 const [alertMessage, setAlertMessage] = useState('');
 const [error, setError] = useState('');
const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    price: '',
    category: '',
    description: '',
    attendees: '',
    organizer: '',
    image: null,
    quantity: 0,
    // createdBy: createdBy
  });

  const handleInputChange = (e) => {
    const { name, files, value } = e.target;
    if(name === 'image') {
      setFormData(prev => ({
        ...prev,
        image: files[0]
      }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBackClick = () => {
    // Navigate back to event details
    navigate('/');
  };
useEffect(() => {
  const fetchCurrentUser = async () => {
    try {
      const createdByData = await fetch('http://localhost:8080/current_user', {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Created by response:', createdByData);
      
      if (createdByData.ok) {
        const userData = await createdByData.json();
        setCurrentUser(userData);
      } else {
        // User not authenticated
        setCurrentUser({ role: null });
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      setCurrentUser({ role: null });
    }
  };

  fetchCurrentUser();
}, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
   

    setIsSubmitting(true);
    try {

        if(formData.title === '' || formData.date === '' || formData.time === '' || formData.location === '' || formData.price === '' || formData.category === '' || formData.description === '' || formData.attendees === '' ) {
    setError('Please fill in all required fields and select at least one ticket.');
    setIsSubmitting(false);
    return;
  }
    const formDataToSend = new FormData();
  formDataToSend.append("file", formData.image); // key must match @RequestParam("file")

 
  const imageFile= await fetch('http://localhost:8080/upload', {
    credentials: 'include',
    method: 'POST',
    body: formDataToSend
  });
  console.log('Image upload response:', imageFile);
  const imageUrlData = await imageFile.json();
  console.log('Image URL:', imageUrlData);

  console.log('current_user_id:', current_user.id);
      const response = await fetch('http://localhost:8080/event_create', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, createdBy: current_user.id ,imageUrl: imageUrlData.filePath.substring(imageUrlData.filePath.indexOf('uploads')) })
      });
      setImageUrl(imageUrlData.filePath.substring(imageUrlData.filePath.indexOf('uploads')));
      console.log('image:', imageUrl);
      const data = await response.json();
      console.log(data);
      
      if (response.ok) {
        alert('🎉 Event created successfully!');
        setAlertMessage('🎉 Event created successfully!');
        // navigate('/');
      } else {
        alert('Failed to create event. Please try again.');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-form-container">
      {error && <div className="error-message">{error}</div>}
      <div className="booking-header">
        <button className="back-btn" onClick={handleBackClick}>
          ← Back to Event
        </button>
      </div>

      <div className="booking-content">
        <div className="booking-main">
          {alertMessage === '🎉 Event created successfully!' && (
            
          <div className="event-summary">
            <img src={imageUrl} alt={formData.title} className="summary-image" />
            <div className="summary-details">
              <h3>{formData.title}</h3>
              <div className="summary-meta">
                <span>📅 {new Date(formData.date).toLocaleDateString()}</span>
                <span>🕐 {formData.time}</span>
                <span>📍 {formData.location}</span>
                <span>🎫 ${formData.price} per ticket</span>
                <span>👥 {formData.attendees} tickets available</span>
                <span>📝 {formData.description}</span>
              </div>
            </div>
          </div>
        )}
        {current_user && current_user.role === null && (
          <div className="role-warning">
            <p>Please <button className="login-link" onClick={() => navigate('/login')}>log in</button> to create events.</p>
          </div>
        )}
        {(isSubmitting || alertMessage !== '🎉 Event created successfully!') && (
          <form className="booking-form" onSubmit={handleFormSubmit}>
            <div className="form-section">
              <h1>Create Event</h1>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Event Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter event title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Event Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your event date"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter event location"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="organizer">Organizer Name *</label>
                <input
                  type="text"
                  id="organizer"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  placeholder="Enter organizer name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image of Event *</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter event description"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Enter event category"
                >
                  <option value="music">Music</option>
                  <option value="art">Art</option>
                  <option value="technology">Technology</option>
                  <option value="sports">Fitness</option>
                  <option value="food">Food</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="time">Time *</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="Enter the event time"
                  />
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
          </form>)}
        
        </div>
          {(isSubmitting || alertMessage !== '🎉 Event created successfully!') && (
        <div className="booking-sidebar">
          <div className="event-breakdown">
            <h3>Ticket Price and The number of Tickets</h3>
                 <div className="form-group">
                  <label htmlFor="price">Ticket price *</label>
                  <input
                    type="number"
                    id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter the ticket price"
                />
              </div>
                <div className="form-group">
                  <label htmlFor="quantity">Number of Tickets *</label>
                  <input
                    type="number"
                    id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter number of tickets"
                />
              </div>
              <div className="form-group">
                  <label htmlFor="attendees">Number of Attendees *</label>
                  <input
                    type="number"
                    id="attendees"
                  name="attendees"
                  value={formData.attendees}
                  onChange={handleInputChange}
                  placeholder="Enter number of attendees"
                />
              </div>
         
          </div>

          <button 
            type="submit" 
            form="create-form"
            className={`confirm-event-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
            onClick={handleFormSubmit}
          >
            {isSubmitting ? (
              <span>🔄 Processing...</span>
            ) : (
              <span>🎉 Create event </span>
            )}
          </button>
        </div>)}
      </div>
    </div>
  );
};

export default CreateEvent;
