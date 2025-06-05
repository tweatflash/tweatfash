import Link from "next/link";
import Section8 from "../components/introSection/section8";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
const interFont=Inter({
  subsets:["latin"],
  fallback:["placeholder", "sans-serif","system-ui"]
})
export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];
  return (
    
      <div className={`${interFont.className} bg-black min-h-screen w-full flex flex-col justify-center`}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        {children}
      </GoogleOAuthProvider>
      <Section8/>
    </div>
  )
   
}
