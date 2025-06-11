"use client"
import localFont from "next/font/local";
import { Montserrat} from 'next/font/google';
import './globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./context/Authcontext";
  const bricolage = localFont({
    src: "../../public/fonts/Cooljazz.ttf",      
    fallback:["sans-serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"]                                                                                                                                                                                                              
  });
  const Outfitfont = Montserrat(
    {
      subsets: ['latin'],
      weight: ['300', '400', '700', ],
      fallback: ["Inter","Inter Placeholder","sans-serif"],
      style:"normal"
      

    }
  )

  export default function RootLayout({children,}: {children: React.ReactNode}) {

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <AuthProvider>
        <html lang="en" className='dark' data-theme='dark'>
            {/* <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet"/> */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
            <body className={`w-full `}>
                
                  {children}
                
            </body>
        </html>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
   
}
