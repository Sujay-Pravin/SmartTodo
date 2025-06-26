import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google'

// TODO: Replace with your Google OAuth Client ID
const CLIENT_ID = "YOUR_GOOGLE_OAUTH_CLIENT_ID_HERE"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      < Router />
    </GoogleOAuthProvider>
  </StrictMode>,
)
