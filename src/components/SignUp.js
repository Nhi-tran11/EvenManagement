import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import { useState } from 'react';


function SignUp () {
    const navigate = useNavigate();
        const [inputs, setInputs] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [err, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const responseData = await fetch('http://localhost:8080/signup',{
                credentials: 'include',
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                email: inputs.email,
                password: inputs.password,
                name: inputs.name
            }),
        });
       console.log('Response status:', responseData);
        const data = await responseData.json();
        console.log('Response data', data);

        if (responseData.ok) {
            // Handle successful signup
            navigate('/login');
        } else {
            setError(data.message || 'Registration failed');
        }
    } catch (err) {
        setError(err.message);
    }
}

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2 className="login-title">Welcome Our New User! 🍋</h2>
                    <p className="login-subtitle">Create your account</p>
                </div>
                
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-input" 
                            id="email" 
                            value={inputs.email}
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
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
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            placeholder="Enter your password" 
                            name="pswd" 
                        />
                    </div>
                     <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                            type="text" 
                            className="form-input" 
                            id="name" 
                            value={inputs.name}
                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                            placeholder="Enter your name" 
                            name="name" 
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
                    
                    <button type="submit" className="btn-primary" onClick={handleSubmit}>
                        Sign Up
                    </button>
                    {err && <div className="error-message">{err}</div> }
                    <div className="signup-prompt">
                        <span>Already have an account? </span>
                        <button 
                            type="button"
                            onClick={() => navigate('/login')} 
                            className="btn-link"
                        >
                            Sign in here
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;