"use client"
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './signupUi';
export default function page() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <LoginPage/>
    </GoogleOAuthProvider>
  )
}
