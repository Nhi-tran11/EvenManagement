import React, { use } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';


function Header ({ onLogoClick })  {
  const navigate = useNavigate();
  const handleonLogoClick = () => {
    if (onLogoClick) {
      onLogoClick(); // Use the navigation function passed from App component
    }
  };
  const handleLoginClick = () => {
    // Add your login navigation logic here
    // For example: navigate('/login') or onLoginClick()
    navigate('/login');
  };

  return (
    <header className="lemon-header">
      <div className="header-container">
        <div className="logo" onClick={handleonLogoClick}>
          <span className="logo-icon">🍋</span>
          <span className="logo-text">EventLemon</span>
        </div>
        <nav className="nav-menu">
          <button className="nav-btn active">Events</button>
          <button className="nav-btn">Categories</button>
          <button className="nav-btn" onClick={() => navigate('/my-bookings')}>My Bookings</button>
        </nav>
        <div className="header-actions">
          <button className="search-btn">🔍</button>
          <button className="profile-btn" onClick={handleLoginClick}>
            <div className="avatar">👤</div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
