"use client"
import React from 'react'
import Login from './pag'
import { GoogleOAuthProvider } from '@react-oauth/google';
export default function Loginpage() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <Login/>
    </GoogleOAuthProvider>
  )
}
