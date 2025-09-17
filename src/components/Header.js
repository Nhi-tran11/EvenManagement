import React, { useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';


function Header ({ onLogoClick })  {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState(null);
  const handleonLogoClick = () => {

      navigate('/'); // Use the navigation function passed from App component
    
  };
  const handleLoginClick = () => {
    // Add your login navigation logic here
    // For example: navigate('/login') or onLoginClick()
    navigate('/login');
  };
useEffect(() => {
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
const handleLogoutClick = async () => {
    try {
      const fetchResponse = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if(fetchResponse.ok) {
        setCurrentUser(null);
        navigate('/'); // go back to homepage
      }
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };
  return (
    <header className="lemon-header">
      <div className="header-container">
        <div className="logo" onClick={handleonLogoClick}>
          <span className="logo-icon">🍋</span>
          <span className="logo-text">EventLemon</span>
        </div>
        <nav className="nav-menu">
          <button className="nav-btn active" onClick={() => navigate('/')}>Events</button>
          <button className="nav-btn" onClick={() => navigate('/mybookings')}>My Bookings</button>
          <button className="nav-btn" onClick={() => navigate('/manage-event')}>Manage my events</button>
          <button className="nav-btn" onClick={() => navigate('/create-event')}>Create my own event</button>
        </nav>
        <div className="header-actions">
          <button className="search-btn">🔍</button>
          {currentUser ? (
            //  If logged in → show logout
            <button className="profile-btn" onClick={handleLogoutClick}>
              <div className="avatar"> Sign Out</div>
            </button>
          ) : (
            // If not logged in → show login
            <button className="profile-btn" onClick={handleLoginClick}>
              <div className="avatar">👤 </div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
