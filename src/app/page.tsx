'use client'
import IntroLayout from './components/introLayout'
import { useRouter } from 'next/navigation'
export default function Example() {
  const router=useRouter()
  if(document.cookie.includes("RFTFL")){
    return router.push("/home") 
  } else{ 
    return <IntroLayout/>
  }
}
