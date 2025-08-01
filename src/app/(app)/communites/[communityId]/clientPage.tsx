"use client"
import axios from '@/app/api/axios/axios'
import CommunityCompartment from '@/app/components/posts/communityCompartment'
import { AuthContext } from '@/app/context/Authcontext'
import { useContext, useEffect, useState } from 'react'
import quickAction from '../../../../../lib/follow'

type Prop ={
    data:EachComm
}
export default function Page({data}:Prop) {
    const {userObj}=useContext<any>(AuthContext)
    const followcommunity=async ()=>{  
        const data2 = await quickAction({type:"followCommunity",data:data._id});
        console.log(data2);
    }
    const [joined,setJoined]=useState(false)
    return (
        <div className="flex flex-col justify-center relative">
                <div className="flex justify-center"> 
                <div className="w-full max-w-[568px]">
                    <div className="w-full feedMax:pt-4">
                    
                    <div className="flex flex-col border-b border-[hsl(var(--border-color))]">
                        <div className="flex-col relative overflow-hidden max-h-40">
                            <div className='pb-[30.3333%] '></div>
                            <div className="absolute overflow-hidden feedMax:rounded-lg w-full h-full bg-[hsl(var(--accent))] top-0">
                            {
                                data.coverImage ? <img src={data.coverImage} alt="community banner" className="h-full w-full object-cover object-center "/>:<></>
                            }
                            </div>

                        </div>
                        <div className='flex flex-col gap-3 mb-4 p-4 pt-0 mobile:pl-0 mobile:pr-0'>
                            <div className="flex flex-wrap gap-2 mobile:pl-4 mobile:pr-4">
                            <div className='min-w-[48px] relative mt-[-10%] w-[20%]'>
                                <div className='pb-[100%]'></div>
                                <div className="absolute top-0  w-full h-full rounded-full bg-[hsl(var(--background))] p-1 flex overflow-hidden">
                                <div className="bg-[hsl(var(--accent))] w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                                    <img src={data.profileImage? data.profileImage : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png'} className='object-cover object-center w-full h-full' alt='profile image'/>
                                </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <h3 className='text-2xl dark:text-[rgb(225,225,225)]'>{data.name}</h3>
                            </div>
                            </div>

                            <div className="flex flex-col gap-2">
                            
                            
                            <div className=''>
                                <span className="dark:text-[rgb(225,225,225)] text-[15px] ">
                                
                                {data.bio? data.bio :""}
                                
                                </span>
                            </div>
                            <div className="flex-1">
                                <div
                                    
                                    className=" font-[500] w-fit gap-2 flex items-center text-sm text-[--color]"
                                    >
                                    <div className="flex -space-x-2">
                                    {
                                        data.followers.slice(0,5).map((item:CommunityFollower,index:number)=>(
                                        <div className="bg-[hsl(var(--accent))] border border-[hsl(var(--border-color))] overflow-hidden inline-block size-7 rounded-full ring-2 ring-[hsl(var(--background))]">
                                            <img
                                            alt="P"
                                            src={item.profileImage}
                                            className="size-full"
                                        />
                                        </div>
                                            
                                        ))
                                    }
                                    
                                    
                                    </div>
                                    <span className="flex items-center">{data.followers.length} </span>
                                    <span className="text-[#727272]">Members</span>
                                </div>

                            </div>
                            <div className="flex-1 flex flex-w">
                                {data.categories.map((item,index)=>(
                                    <button
                                        type="button"
                                        key={index}
                                        className="border outline-none border-[hsl(var(--border-color))] text-[--color] font-medium text-sm rounded-full px-3 py-[3px] text-center inline-flex items-center me-2 mb-2"
                                    >
                                    
                                        {item}
                                    </button>
                                ))}
                                
                            </div>
                            </div>
                            <div className="flex flex-row flex-grow gap-2 justify-end">
                                <div className="flex-1 flex-col">
                                    <button onClick={followcommunity} type="button" className="px-4 w-full h-full bg-[#4070f4] rounded-lg font-[500] text-white text-[15px]">{joined ?"Joined" :"Join"}</button>
                                </div>
                                <div className="flex-1 flex-col">
                                    <button type="button" className=" w-full h-full bg-[hsl(var(--accent))] rounded-lg text-black dark:text-white text-[15px]">Copy Link</button>
                                </div>
                                <div className="flex flex-col">
                                    <button type="button" className="bg-[hsl(var(--accent))] flex justify-center items-center rounded-lg w-9 aspect-square">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={20}
                                        height={20}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        // stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="stroke-black dark:stroke-white"
                                    >
                                        <circle cx={12} cy={12} r={1} />
                                        <circle cx={19} cy={12} r={1} />
                                        <circle cx={5} cy={12} r={1} />
                                    </svg>

                                    </button>
                                </div>
                                <div className="flex flex-col">
                                    <button type="button" className="bg-[hsl(var(--accent))] flex justify-center items-center rounded-lg w-9 aspect-square">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-black dark:stroke-white"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <CommunityCompartment communityId={data._id}/>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    )
}
