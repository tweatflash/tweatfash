"use client"
import SuggestedCommunityPost from '@/app/components/communityPosts/suggestedcommunityPost';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Page() {
    const tabs = [
        "search",
        "Tech Enthusiasts",
        "Gamers",
        "Fitness & Wellness",
        "Music Lovers",
        "Book Clubs",
        "Pet Owners",
        "Foodies & Home Cooks",
        "Travel & Adventure",
        "Entrepreneurs & Startups",
        "Students & Study Buddies",
        "Movie Buffs",
        "Fashion & Style",
        "Parenting & Family Life",
        "Artists & Creators",
        "Sports Fans",
        "Environmental & Sustainability",
        "Mental Health & Support",
        "Anime & Pop Culture",
        "Career & Professional Growth",
        "Language & Cultural Exchange"
    ];
    useEffect(()=>{

    },[])
    const [activeTab,setActiveTab]=useState(1)
    return (
        <div className="w-full h-auto"> 
            <div className="flex flex-col justify-center relative">
                <div className="flex justify-center gap-5"> 
                    <div className="flex w-full max-w-[568px] flex-col gap-4 relative pt-4" >


                        {/* alternate  */}
                        <div className="border-b hidden border-[hsl(var(--border-color))]">
                            <ul className="flex flex-wrap -mb-px text-sm text-center text-gray-500 dark:text-gray-400">
                                
                                <li className=" flex-1">
                                    <a
                                        href="#"
                                        className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg font-[boldCal] active dark:text-blue-500 dark:border-blue-500 group w-full"
                                        aria-current="page"
                                        
                                    >
                                        {/* <svg
                                        className="w-4 h-4 me-2 text-blue-600 dark:text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 18 18"
                                        >
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                        </svg> */}
                                        Community
                                    </a>
                                </li>
                                <li className="flex-1">
                                    <a
                                        href="#"
                                        className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg font-[boldCal] hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group w-full"
                                    >
                                        
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg> */}
                                        Discover
                                    </a>
                                </li>
                            
                            </ul>
                        </div>
                        {/* alternate  */}
                        {/* <div className='border-b border-[hsl(var(--border-color))] pb-3 w-full mobile:px-0 px-4'>
                            <div className="flex flex-col justify-start relative overflow-x-hidden resize-none">
        
                                <div className="w-full relative overflow-x-auto flex flex-col h-12 no-scrollbar">
                                    
                                    <div className="flex min-w-full justify-start absolute m-auto w-fit gap-3">
                                        {tabs.map((tab, index) => (
                                            <Link href={""}>
                                                <div
                                                    key={index}
                                                    className={`whitespace-nowrap flex flex-row gap-2 h-12 rounded-xl px-3 font-[boldCal] bg-[hsl(var(--accent))] text-[--color]`}            
                                                >
                                                    <div className='flex justify-center items-center'>
                                                        <div className='size-8 rounded-md'>
                                                            <div className="size-full bg-[hsl(var(--accent))] rounded-full">
                                                                <img
                                                                    alt={"userObj.name"}
                                                                    src={"https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"}
                                                                    className="h-full w-full object-cover object-center rounded-full"
                                                                />
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-1 items-center'> 
                                                        <p className='text-sm'>{tab}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div> 
                                </div>
                                
                            </div>
                        </div> */}

                        {/* tabs */}
                        <div className="flex flex-col justify-start items-center relative overflow-x-hidden resize-none px-4">
                            {/* <div className='absolute left-0 h-full aspect-square rounded-full bg-slate-500 z-10'></div>
                            <div className='absolute right-0 h-full aspect-square rounded-full bg-slate-500 z-10'></div> */}
                            <div className="w-full relative overflow-x-auto flex flex-col h-8 no-scrollbar">
                                
                                <div className="flex min-w-full justify-start absolute m-auto w-fit gap-2">
                                    {tabs.map((tab, index) => (

                                        tab==='search' ? 
                                            <button
                                                key={index}
                                                
                                                className={`flex-1 whitespace-nowrap text-center text-sm text-nowrap h-8 rounded-lg border border-[hsl(var(--border-color))] px-2 font-bold bg-[hsl(var(--accent))] ${2 === index ? "bg-black text-white dark:bg-white dark:text-black" : "text-[#777777]"                                                    
                                            }`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-black dark:stroke-white"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg> 
                                            </button> :
                                            
                                            <button
                                                key={index}
                                                onClick={()=>setActiveTab(index)}
                                                className={`flex-1 whitespace-nowrap text-center text-sm text-nowrap h-8 rounded-lg px-4 bg-[hsl(var(--accent))] ${activeTab === index ? "bg-black text-white dark:bg-white dark:text-black" : "text-[#777777]"                                                    
                                            }`}
                                            >
                                                {tab}
                                            </button>
                                        
                                        
                                            
                                        
                                    ))}
                                </div> 
                            </div>
                            
                        </div>
                        <SuggestedCommunityPost />
                    </div>
                     {/* <div className="lg:flex hidden w-full max-w-[400px] bg-[hsl(var(--accent))] mt-5 rounded-lg h-[300px] sticky top-[85px]">

                     </div> */}
                    
                </div>
            </div>
        </div>
    )
}
