'use client'
import IntroLayout from './components/introLayout'
import { useRouter } from 'next/navigation'
export default function Example() {
  const router=useRouter()
    return <IntroLayout/>
}
