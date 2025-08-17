import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

function LogIn() {
    const navigate = useNavigate();

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2 className="login-title">Welcome Back! 🍋</h2>
                    <p className="login-subtitle">Sign in to your account</p>
                </div>
                
                <form className="login-form" action="/action_page.php">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-input" 
                            id="email" 
                            placeholder="Enter your email" 
                            name="email" 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="pwd" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-input" 
                            id="pwd" 
                            placeholder="Enter your password" 
                            name="pswd" 
                        />
                    </div>
                    
                    <div className="form-check">
                        <input 
                            className="form-checkbox" 
                            type="checkbox" 
                            id="remember"
                            name="remember" 
                        />
                        <label htmlFor="remember" className="checkbox-label">
                            Remember me
                        </label>
                    </div>
                    
                    <button type="submit" className="btn-primary">
                        Sign In
                    </button>
                    
                    <div className="signup-prompt">
                        <span>Don't have an account? </span>
                        <button 
                            type="button"
                            onClick={() => navigate('/signup')} 
                            className="btn-link"
                        >
                            Sign up here
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogIn;