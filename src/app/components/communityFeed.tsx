"use client"
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import Example from "./list";
type daveA={
    dave:CommunityPost
}

export default function CommunityFeed({dave}: daveA) {
    const router=useRouter()
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
        <div className="flex flex-col py-5 w-full"  role="article">
            <div className="gap-3 flex item-start w-full px-4 ">
                {/* <Link href={""}> */}
            <div className="size-9 relative rounded-md border border-[hsl(var(--border-color))] ">
                
                <Link href={"/communites/" + dave.communityDetails._id} className="relative">
                    <div className="size-full rounded-md overflow-hidden">
                        <img
                            alt={dave.communityDetails.name}
                            src={dave.communityDetails.profileImage?dave.communityDetails.profileImage : "https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png"}
                            className="size-full object-cover object-center"
                        />
                    </div>
                </Link>
                <div className=" size-6 rounded-full  absolute bottom-[-5px] right-[-5px] outline outline-2 outline-[hsl(var(--background))]">
                    <img
                        alt={dave.user.name}
                        src={dave.user.profileImage?dave.user.profileImage : "https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png"}
                        className=" h-full w-full object-cover object-center rounded-full"
                    />
                </div>
            </div>
                {/* </Link> */}
            <div className="w-full flex-1 flex flex-col">
                <div className="w-full  flex flex-col gap-2">
                
                    <div className="gap-1 flex flex-col">
                        <div className="flex flex-col">
                            <div className="flex justify-between gap-2">
                                <div className="flex items-center w-full h-full">
                                    <div className="w-full h-full tracking-wide decoration-0 flex">
                                        <div className="flex justify-between gap-2">
                                            <div className="flex flex-col leading-1">
                                                <span className="text-black w-full overflow-ellipsis whitespace-nowrap font-[500] dark:text-[#EEEEEE] text-[15px] decoration-0 overflow-hidden ">
                                                    <Link
                                                        href={"/communites/"+ dave.communityDetails._id}
                                                        className="hover:underline decoration-0"
                                                    >
                                                        {dave.communityDetails.name}
                                                    </Link>
                                                </span>
                                                <span className="text-[#727272] w-full inline-flex gap-2 overflow-ellipsis whitespace-nowrap text-sm  decoration-0 overflow-hidden ">
                                                    <Link
                                                        href={"/"+ dave.user.username}
                                                        className="hover:underline decoration-0"
                                                    >
                                                        {dave.user.name}
                                                    </Link>
                                                    {/* <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">Badge</span> */}
                                                </span>
                                            </div>
                                            
                                        </div>
                                       
                                    </div>
                                    
                                
                                </div>
                            <div className="flex gap-2">
                                {/* <span className="h-fit font-bold inline-flex whitespace-nowrap items-center rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                                    {dave.} Aura
                                </span> */}
                                <div className="flex items-center">
                                    <div
                                    id="trigger5"
                                    aria-expanded="false"
                                    aria-haspopup="dialog"
                                    aria-controls="dialog6"
                                    aria-label="View more"
                                    className="flex items-center"
                                    >
                                    <button
                                        tab-index="0"
                                        type="button"
                                        aria-label="More options"
                                        className=""
                                    >
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className=" stroke-gray-900 dark:stroke-gray-200"
                                        >
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="19" cy="12" r="1"></circle>
                                        <circle cx="5" cy="12" r="1"></circle>
                                        </svg>
                                    </button>
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
                                    <p className={`text-[--color] font-[300] opacity-85  text-[15px] whitespace-pre-wrap tracking-wide decoration-0`}>
                                        {dave.text && dave.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {dave.img?.length ?
                        <div className="block overflow-hidden w-full cursor-wait" tabIndex={1} onClick={()=>handleParent(dave._id ,dave.user.username)}>
                            <div draggable="false" tabIndex={2} className={`cursor-not-allowed flex bg-[hsl(var(--accent))] object-cover bg-center bg-cover w-full aspect-[2/1] overflow-hidden min-w-20 rounded-xl relative border border-[hsl(var(--border-color))] border-solid `} onClick={(event)=>handleChild(event)}>
                                
                            </div>
                        </div>
                        // <ContentWrapper param={dave.img}/>
                        :<></>
                       
                    }
                    <div className="gap-2 flex justify-between">
                        <div className="flex gap-[15px]">
                            <span className="flex ml-[-8px] ">
                                <button  
                                    
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        
                                    // Logic to view image or open image viewer
                                    }} 
                                    className={`
                                        flex gap-[6px] px-2 h-8 items-center rounded-[20px] 
                                        hover:bg-[hsl(var(--accent))] text-[#727272] hover:text-[--color]
                                    `}>
                                    <svg viewBox="0 0 20 20" stroke={"currentColor"} fill={"none"} className="h-5 w-5 stroke-[1.5]"><path d="M5.00002 2.54822C8.00003 2.09722 9.58337 4.93428 10 5.87387C10.4167 4.93428 12 2.09722 15 2.54822C18 2.99923 18.75 5.66154 18.75 7.05826C18.75 9.28572 18.1249 10.9821 16.2499 13.244C14.3749 15.506 10 18.3333 10 18.3333C10 18.3333 5.62498 15.506 3.74999 13.244C1.875 10.9821 1.25 9.28572 1.25 7.05826C1.25 5.66154 2 2.99923 5.00002 2.54822Z"></path></svg>
                                        {dave.likes.length? <span className={`text-sm `}>{dave.likes.length}</span>:<></>}
                                </button>
                            </span>
                            <span className="flex ml-[-8px] ">
                                <button className="flex gap-[6px] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] fill-[#727272] hover:fill-[--color] rounded-[20px]"onClick={(e)=>{
                                    // handleParent(dave._id ,dave.user.username)
                                     e.stopPropagation();
                                    
                                }} >
                                
                                    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                                    {dave.comments.length? <span className="text-sm text-[#727272]">{dave.comments.length}</span>:<></>}
                                </button>
                            </span>
                            <span className="flex ml-[-8px] ">
                                <button className="flex gap-[6px] px-2 h-8 stroke-[#727272] hover:stroke-[--color] items-center hover:bg-[hsl(var(--accent))] rounded-[20px]" onClick={(e) => {
                                        e.stopPropagation();
                                        
                                    // Logic to view image or open image viewer
                                    }} >
                                    <svg role="img" width="20" height="20" viewBox="0 0 20 20" fill="none" strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><g><title></title><path d="M2.53001 7.81595C3.49179 4.73911 6.43281 2.5 9.91173 2.5C13.1684 2.5 15.9537 4.46214 17.0852 7.23684L17.6179 8.67647M17.6179 8.67647L18.5002 4.26471M17.6179 8.67647L13.6473 6.91176M17.4995 12.1841C16.5378 15.2609 13.5967 17.5 10.1178 17.5C6.86118 17.5 4.07589 15.5379 2.94432 12.7632L2.41165 11.3235M2.41165 11.3235L1.5293 15.7353M2.41165 11.3235L6.38224 13.0882"></path></g></svg>
                                    {dave.quotes.length? <span className="text-sm text-[#727272]">{dave.quotes.length}</span>:<></>}
                                </button>
                            </span>
                        
                        </div>
                        <div className="flex flex-row gap-3">
                           <span className="flex ml-[-8px] ">
                                <button className="text-[#727272] hover:text-[--color] flex gap-[6px] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] rounded-[20px]" 
                                
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        
                                    // Logic to view image or open image viewer
                                    }} 
                                >
                                  <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="size-5"
                                        fill="currentColor"
                                    >
                                    <g>
                                        <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z" />
                                    </g>
                                    </svg>                                    
                                </button>
                            </span>
                            <span className="flex ml-[-8px] ">
                                <button className="flex gap-[6px] stroke-[#727272] hover:stroke-[--color] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] rounded-[20px]"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    // Logic to view image or open image viewer
                                    }}
                                >
                                    <svg
                                      role="img"
                                      className="size-5"
                                      viewBox="0 0 20 20" 
                                      fill="none" 
                                      strokeWidth="1.5" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round" 
                                      xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                          <title></title>
                                          <path d="M10.2171 2.2793L10.2171 12.9745M10.2171 2.2793L13.333 4.99984M10.2171 2.2793L7.08301 4.99984M2.49967 10.9925L2.49967 14.1592C2.49967 16.011 4.00084 17.5121 5.85261 17.5121L14.9801 17.5121C16.8318 17.5121 18.333 16.011 18.333 14.1592L18.333 10.9925"></path>
                                      </g>
                                    </svg>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
