"use client"
import { useEffect, useState } from "react";
import LayoutB from "../components/layoutB";
import Loading from "../loadingd";
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
      useEffect(() => {
        if(document.cookie.includes("RFTFL")) {
        
          setIsAuthenticated(true)
        }else{
          setIsAuthenticated(false)
        }
    }, []);
    return (
      isAuthenticated===null ?<Loading/>:(isAuthenticated? children :<LayoutB>{children}</LayoutB>)
    )
     
  }
  