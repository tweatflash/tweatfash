import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './signupUi';
export default function page() {
  const clientId=process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
  return (
    <GoogleOAuthProvider clientId={clientId}>
        <LoginPage clientId={clientId}/>
    </GoogleOAuthProvider>
  )
}
