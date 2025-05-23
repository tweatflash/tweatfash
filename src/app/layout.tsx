"use client"
import { AuthContext, AuthProvider } from './context/Authcontext';

import './globals.css'
import { Sofia_Sans } from "next/font/google";
import checkLoggedinStatus from '../../lib/checkLoggedinStatus';
import { useContext, useEffect, useState } from 'react';
import Loading from './loadingd';
import LayoutA from './components/layoutA';
import LayoutB from './components/layoutB';
import Cookies from 'js-cookie';

const geist = Sofia_Sans({
  subsets: ["latin"],
  weight: ["400"], 
});
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
        <body className={`${geist.className} flex justify-center bg-[hsl(var(--background))]`}>
          <AuthProvider>
            {isAuthenticated===null ? <Loading/>:(isAuthenticated ?<LayoutB>{children}</LayoutB> :<LayoutA>{children}</LayoutA>)}
          </AuthProvider>
        </body>
    </html>
  )
   
}
