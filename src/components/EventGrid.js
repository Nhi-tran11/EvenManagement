import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard';
import './EventGrid.css';

const EventGrid = () => {
  const navigate = useNavigate();

  const handleEventSelect = (event) => {
    // Store the selected event in localStorage for the EventDetails component
    localStorage.setItem('selectedEvent', JSON.stringify(event));
    // Navigate to the event details page
    navigate('/event-details');
  };

  // Sample event data with Lemon8-style variety
  const events = [
    {
      id: 1,
      title: "Summer Music Festival 🎵",
      date: "2025-08-25",
      time: "18:00",
      location: "Central Park, NYC",
      price: 89,
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop",
      category: "Music",
      attendees: 1250,
      description: "Join us for an unforgettable evening of live music featuring top artists from around the world."
    },
    {
      id: 2,
      title: "Food & Wine Tasting 🍷",
      date: "2025-08-30",
      time: "19:30",
      location: "Rooftop Terrace, Downtown",
      price: 125,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      category: "Food",
      attendees: 80,
      description: "Experience exquisite flavors and premium wines in an elegant rooftop setting."
    },
    {
      id: 3,
      title: "Tech Innovation Summit 💻",
      date: "2025-09-05",
      time: "09:00",
      location: "Convention Center",
      price: 299,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      category: "Technology",
      attendees: 500,
      description: "Discover the latest trends in technology and network with industry leaders."
    },
    {
      id: 4,
      title: "Art Gallery Opening 🎨",
      date: "2025-09-10",
      time: "17:00",
      location: "Modern Art Museum",
      price: 45,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      category: "Art",
      attendees: 200,
      description: "Celebrate contemporary art with exclusive previews and artist meet-and-greets."
    },
    {
      id: 5,
      title: "Fitness Bootcamp 💪",
      date: "2025-09-15",
      time: "07:00",
      location: "Beach Park",
      price: 35,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      category: "Fitness",
      attendees: 150,
      description: "Start your day with an energizing workout session by the beach."
    },
    {
      id: 6,
      title: "Comedy Night Live 😂",
      date: "2025-09-20",
      time: "20:00",
      location: "The Laugh House",
      price: 55,
      image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=400&h=300&fit=crop",
      category: "Entertainment",
      attendees: 300,
      description: "Get ready to laugh until your sides hurt with top-tier comedians."
    }
  ];

  return (
    <div className="event-grid-container">
      <div className="hero-section">
        <h1>Discover Amazing Events</h1>
        <p>Find and book the perfect experiences near you</p>
      </div>
      
      <div className="filter-section">
        <div className="filter-pills">
          <button className="filter-pill active">All</button>
          <button className="filter-pill">Music</button>
          <button className="filter-pill">Food</button>
          <button className="filter-pill">Technology</button>
          <button className="filter-pill">Art</button>
          <button className="filter-pill">Fitness</button>
        </div>
      </div>

      <div className="events-grid">
        {events.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            onSelect={() => handleEventSelect(event)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventGrid;
