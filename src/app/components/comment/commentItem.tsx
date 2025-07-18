"use client"
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useContext, } from "react";
import { AuthContext } from "@/app/context/Authcontext";
import ContentWrapper from "../contentWrapper";

type daveA={
    dave:HomeFeed
}

export default function CommentFeed({dave}: daveA) {
    const router=useRouter()
    const iconRef = useRef<any>(null);
 const {userObj,visible,
          setVisible,
          onClose,
          position,
          setPosition,anchorEl,openMenu, setAnchorEl,setCommentFeed,setCommentOpen}:any=useContext(AuthContext)
    
    


    function time(date: string): string {
        const now = new Date();
        const past = new Date(date);
        const diff = now.getTime() - past.getTime();

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 7) {
            return past.toLocaleString('en-US', { month: 'short', day: 'numeric' });
        } else if (days > 0) {
            return days + (days === 1 ? 'd' : 'd');
        } else if (hours > 0) {
            return hours + (hours === 1 ? 'h' : 'h');
        } else if (minutes > 0) {
            return minutes + (minutes === 1 ? 'm' : 'm');
        } else {
            return seconds + (seconds === 1 ? 's' : 's');
        }
    }
    const longFormatTime=(ISODATE:string):{
      longDate:string,
      longTime:string
    }=>{
    const isoDate = "2025-04-13T17:53:47.479Z";
    const date = new Date(ISODATE);
    const longDate = date.toLocaleDateString("en-US", {
      
      year: "numeric",
      month: "short",
      day: "numeric",
    }); 
    const longTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      // timeZoneName: "short",
      // timeZone: "Africa/Lagos", 
    });
    return {longDate,longTime} 
     // Output: Sunday, April 13, 2025, 5:53:47 PM UTC
    }
    const handleParent=(postId:string,username:string):void=>{
        router.push(`/${username}/status/${postId}`)
    }
    const handleChild=(event:React.MouseEvent):void=>{
        event.stopPropagation();
        console.log("child")
    }

   
    
    return (
        <div className="flex flex-col relative border-b border-solid border-[hsl(var(--border-color))] last:border-none last:border-b-0" onClick={()=>console.log(dave)}>
        <div className="flex flex-col  w-full"  role="article">
            <div className="gap-3 flex item-start w-full px-4 ">
            <div className="flex justify-center relative">
                <div className="w-9 h-9 rounded-[50%] border border-[hsl(var(--border-color))] bg-[hsl(var(--accent))]">
                    <img
                        alt={dave.user.name}
                        src={dave.user.profileImage}
                        className="h-full w-full object-cover object-center rounded-full"
                    />
                </div>
                <div className="absolute h-[calc(100%-34px)] top-10 z-20 w-[2px] bg-[hsl(var(--border-color))] "></div>
            </div>
            <div className="w-full flex flex-col">
                <div className="w-full  flex flex-col gap-2">
                
                    <div className="gap-1 flex flex-col">
                        <div className="flex flex-col">
                            <div className="flex justify-between gap-2">
                                <div className="flex items-center w-full h-full">
                                    <div className="w-full h-full tracking-wide decoration-0 flex">
                                        <div className="flex justify-between gap-2">
                                            <div className="flex">
                                                <span className="text-black w-full whitespace-nowrap font-[500] dark:text-[#EEEEEE] text-[15px] decoration-0 truncate">
                                                    <div
                                                        
                                                        className="hover:underline decoration-0 truncate"
                                                    >
                                                        {dave.user.name}
                                                    </div>
                                                </span>
                                            </div>
                                            <span className="">
                                                <span className="text-[13px] text-[#727272] whitespace-nowrap ">
                                                    <div
                                                        title={longFormatTime(dave.createdAt).longDate +" "+longFormatTime(dave.createdAt).longTime }
                                                        
                                                        className=""
                                                        
                                                    >
                                                        
                                                        {time(dave.createdAt)}
                                                        
                                                    </div>
                                                </span>
                                            </span>
                                        </div>
                                       
                                    </div>
                                    
                                
                                </div>
                            
                            </div>
                            {/* <span className="text-[#727272] text-[15px]">
                                <Link
                                    href="/@oyinosikoya?"
                                    className=""
                                >
                                    @oyinosikoya
                                </Link>
                            </span> */}
                        </div>
                        <div className="flex" onClick={()=>handleParent(dave._id ,dave.user.username)}>
                            <div className="flex">
                                <div className="flex">
                                    <p className={`text-[--color] break-all break-words font-[400] opacity-80 text-[15px] whitespace-pre-wrap tracking-wide decoration-0`}>
                                        {dave.text && dave.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ContentWrapper param={dave} />
                    <div className="gap-2 flex justify-between">
                        <p className=" text-[#727272] text-sm">
            Replying to <span className="text-blue-500">@{dave.user.username}</span>
          </p>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
