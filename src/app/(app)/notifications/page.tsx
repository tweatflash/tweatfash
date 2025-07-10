"use client"
import { useEffect, useState } from "react"
import Example from "./j"

export default function Notifications() {
  const tabs= ["All","Unread"]
  
  const [activeTab,setActiveTab]=useState(0)
  return (
    <div className="w-full h-auto"> 
      <div className="flex flex-col justify-center relative">
        <div className="flex justify-center"> 
          <div className="w-full max-w-[568px] text-[--color] flex gap-4 flex-col " >
            <div className="flex w-full pt-4 gap-3 flex-col relative" >
              <Example />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
