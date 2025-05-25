"use client"
import { AuthContext, AuthProvider } from './context/Authcontext';
import localFont from "next/font/local";
import {Sofia_Sans} from 'next/font/google';
import './globals.css'
import checkLoggedinStatus from '../../lib/checkLoggedinStatus';
import { useContext, useEffect, useState } from 'react';
import Loading from './loadingd';
import LayoutA from './components/layoutA';
import LayoutB from './components/layoutB';
import Cookies from 'js-cookie';


const bricolage = localFont({
  src: "../../public/fonts/Cooljazz.ttf",
});
const Interfont = Sofia_Sans(
  {
    subsets: ['latin'],
    fallback: ['ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']

  }
)



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    const Cook=Cookies.get("RFTFl")
    // const {auth}=useContext(A)
    if(document.cookie.includes("RFTFL")) {
    
      setIsAuthenticated(true)
    }else{
      setIsAuthenticated(false)
    }
  }, []);

  return (
    <html lang="en" className='' data-theme=''>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
        <body className={`${Interfont.className} flex justify-center bg-[hsl(var(--background))]`}>
          <AuthProvider>
            {isAuthenticated===null ? <Loading/>:(isAuthenticated ?<LayoutB>{children}</LayoutB> :<LayoutA>{children}</LayoutA>)}
          </AuthProvider>
        </body>
    </html>
  )
   
}
