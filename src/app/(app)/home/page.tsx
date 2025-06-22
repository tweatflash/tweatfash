"use client"
import { Suspense, useContext, useState } from "react"
import SuggestedPost from "../../components/posts/suggestedPost"
import NewestPosts from "../../components/posts/newestPosts"
import SavedPosts from "../../components/posts/savedPosts"
import FollowingPosts from "../../components/posts/followingPosts"
import LikedPosts from "../../components/posts/likedPosts"
import PostedByYou from "../../components/posts/postedByYou"
import { AuthContext } from "@/app/context/Authcontext"
export default function HomePage() {
  const [activeTab,setActiveTab]=useState(0)
  const {userObj}=useContext<any>(AuthContext)
  const tabs = ["for you","Following","Newest Tweats" ,"Saved Tweats" ,"Posted by you" ,"Liked Posts"];  
  return (
    
      <div className="w-full min-h-full h-auto"> 
          <div className="flex flex-col justify-center relative py-2 px-0 mobile:pl-20 mobile:pr-12 mobile:py-4 overflow-x-hidden resize-none">
           
            <div className="w-full relative overflow-x-auto flex flex-col h-12 no-scrollbar p-2">
              
              <div className="flex min-w-full justify-center absolute m-auto w-fit gap-2 px-2">
                  {tabs.map((tab, index) => (
                      <button
                          key={index}
                          className={`whitespace-nowrap text-center text-sm text-nowrap h-8 rounded-lg px-3 font-bold bg-[hsl(var(--accent))] ${
                          activeTab === index ? "bg-black text-white dark:bg-white dark:text-black" : "text-[#777777]"
                          }`}
                          onClick={()=>setActiveTab(index)}
                      >
                          {tab}
                      </button>
                  ))}
              </div> 
                  
                  
            </div>

            
            
          </div>  
          <div className="flex justify-center min-h-full"> 
            <div className="w-full max-w-[568px] min-h-full">
              <div className="w-full min-h-full">
                
                {/* { results?.map(item=><Feed dave={item} key={item._id}/>)} */}
                {activeTab === 0 && <SuggestedPost/>} 
                {activeTab === 1 && <FollowingPosts/>}
                {activeTab === 2 && <NewestPosts/>}
                {activeTab === 3 && <SavedPosts data="dave"/>}
                {userObj?.user && (activeTab === 4 && <PostedByYou username={userObj.user.username}/>)}
                {activeTab === 5 && <LikedPosts/>}
              </div>
            </div>
          </div>
      </div>
  )
}
