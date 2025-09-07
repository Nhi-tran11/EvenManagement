import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';
import { useState } from 'react';

function LogIn() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [err, setError] = useState(null);
    const handleSubmit =async (e) =>{
         
        e.preventDefault();
        try{
            const responseData= await fetch('http://localhost:8080/login',{
                credentials: 'include',
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputs.email,
                    password: inputs.password,
                })
            });
            console.log('Response status:', responseData);
            const data = await responseData.json();
            console.log('Response data', data);
            if (responseData.ok) {
                // Handle successful signup
            navigate('/');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Error:', err);
        }

    }

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
                            onChange ={e => setInputs({...inputs, email:e.target.value})}
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
                            onChange ={e=> setInputs({...inputs, password:e.target.value})}
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
                    
                    <button type="submit" onClick={handleSubmit} className="btn-primary">
                        Sign In
                    </button>
                    {err && <div className="error-message">{err}</div>}
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