"use client"
import React, { useState } from 'react'
import PostedByYou from './postedByYou'
type param={
    username:string
}

export default function PostCompartment({username}:param) {
    const tabs= ["Posts","Saved Posts","Likes","Replies"]
    const [activeTab,setActiveTab]=useState(0)
    return (
        <>
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-row justify-center -mb-px">
                    {tabs.map((tab, index) => {
                        return(
                        <li key={index} onClick={()=>setActiveTab(index)}  className={`flex-1 border-b-[3px] ${index==activeTab?"text-blue-600  border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" :"flex-1 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} `}>
                            <a href="#" className="inline-block pb-2 ">{tab}</a>
                        </li>
                        )
                    })}
                    
                    {/* <li>
                            <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
                    </li> */}
                </ul>
            </div>
            <div className="flex flex-col">
                <PostedByYou username={username}/>
            </div>
        </>
    )
}
