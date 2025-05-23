import Tabs from "../components/tab"
import Feed from "../components/feed"
import getHomePosts from "../../../lib/posts/getHomePosts"

import { Suspense, useState } from "react"
import SuggestedPost from "../components/posts/suggestedPost"
import NewestPosts from "../components/posts/newestPosts"
import SavedPosts from "../components/posts/savedPosts"
import FollowingPosts from "../components/posts/followingPosts"
import LikedPosts from "../components/posts/likedPosts"
import PostedByYou from "../components/posts/postedByYou"
import Cookies from "js-cookie"
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = cookies();
  const activeTab=0
  const rf :string | undefined=cookieStore.get("RF  TFL")?.value
  const ac:string | undefined=cookieStore.get("ACTFL")?.value
  // console.log("hello world",rf,ac)
  let dataA :string[]=[]
  const data : Promise<Post>=await getHomePosts(dataA,rf,ac) 
  const results: HomeFeed[] | undefined = await (await data)?.posts;
  console.log(results)
  const tabs = ["for you","Following","Newest Tweats" ,"Saved Tweats" ,"Posted by you" ,"Liked Posts"];  
  return (
    
      <div className="w-full h-auto"> 
          <div className="flex flex-col justify-center relative py-2 px-0 mobile:pl-20 mobile:pr-12 mobile:py-4 overflow-x-hidden resize-none">
            {/* Tab Buttons */}
            <div className="w-full relative overflow-x-auto flex flex-col h-12 no-scrollbar p-2">
              
              <div className="flex min-w-full justify-center absolute m-auto w-fit gap-2 px-2">
                  {tabs.map((tab, index) => (
                      <button
                          key={index}
                          className={`whitespace-nowrap text-center text-sm text-nowrap h-8 rounded-lg px-3 bg-[hsl(var(--accent))] ${
                          activeTab === index ? "bg-black text-white dark:bg-white dark:text-black" : "text-[#777777]"
                          }`}
                      >
                          {tab}
                      </button>
                  ))}
              </div> 
                  
                  
            </div>

            
            {/* <div className="p-4">
              {activeTab === 0 && <p>Welcome to the Home tab!</p>}
              {activeTab === 1 && <p>This is your Profile section.</p>}
              {activeTab === 2 && <p>Here are your Settings.</p>}
            </div> */}
          </div>  
          <div className="flex justify-center"> 
            <div className="w-full max-w-[568px]">
              <div className="w-full">
                
                { results?.map(item=><Feed dave={item} key={item._id}/>)}
                {/* {activeTab === 0 && <SuggestedPost/>} */}
                {/* {activeTab === 1 && <FollowingPosts/>}
                {activeTab === 2 && <NewestPosts/>}
                {activeTab === 3 && <SavedPosts/>}
                {activeTab === 4 && <PostedByYou/>}
                {activeTab === 5 && <LikedPosts/>} */}
              </div>
            </div>
          </div>
      </div>
  )
}
