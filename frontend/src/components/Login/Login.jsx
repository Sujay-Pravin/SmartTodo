import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const letters = ['L', 'O', 'G', 'I', 'N'];
  const navigate = useNavigate();

  const login = useGoogleLogin({
    scope: 'openid email profile https://www.googleapis.com/auth/calendar',
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user info from Google
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        const userData = await res.json();
        localStorage.setItem('user', JSON.stringify(userData));
        // Store the access token for later use with Google Calendar API
        localStorage.setItem('google_access_token', tokenResponse.access_token);
        navigate("/home");
      } catch (error) {
        console.log("Failed to fetch user info", error);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  return (
    <div className='Login-Page'>
      <div className="key-container">
        {letters.map((letter, index) => (
          <div className="keycap" key={index}>
            {letter}
          </div>
        ))}
      </div>

      <div className='GoogleLogin'>
        <button onClick={() => login()}>Sign in with Google</button>
      </div>
    </div>
  );
};

export default Login;
