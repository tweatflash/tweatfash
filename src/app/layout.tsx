"use client"
import localFont from "next/font/local";
import { Poppins} from 'next/font/google';
import './globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./context/Authcontext";
  const bricolage = localFont({
    src: "../../public/fonts/segoe-ui-emoji.ttf",      
    fallback:["sans-serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"]                                                                                                                                                                                                              
  });
  const Outfitfont = Poppins(
    {
      subsets: ['latin'],
      weight: ['300', '400', '700', ],
      fallback: ["sans-serif"],
      style:"normal"
      

    }
  )

  export default function RootLayout({children}: {children: React.ReactNode}) {
    const clientId =process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
          <html lang="en" className='' data-theme='dark'>
              {/* <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet"/> */}
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
              <body className={`w-full bg-[hsl(var(--background))]`}>
                  
                    {children}
                  
              </body>
          </html>
        </AuthProvider>
      </GoogleOAuthProvider>
  )
   
}
