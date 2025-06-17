import React from 'react'
import Login from './pag'
import { GoogleOAuthProvider } from '@react-oauth/google';
export default function Loginpage() {
  const clientId=process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
  return (
    <GoogleOAuthProvider clientId={clientId}>
        <Login clientId={clientId}/>
    </GoogleOAuthProvider>
  )
}
