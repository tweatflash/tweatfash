"use client";
import { Suspense, useContext, useState } from "react";
import SuggestedPost from "../../components/posts/suggestedPost";
import NewestPosts from "../../components/posts/newestPosts";
import SavedPosts from "../../components/posts/savedPosts";
import FollowingPosts from "../../components/posts/followingPosts";
import LikedPosts from "../../components/posts/likedPosts";
import PostedByYou from "../../components/posts/postedByYou";

import { AuthContext } from "@/app/context/Authcontext";
import Example from "@/app/components/list";
import Tabs from "@/app/components/tab";
import CommunityPost from "@/app/components/posts/eachCommunity";
export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const { userObj, openSearch, post, setPost, setOpenSearch } =
    useContext<any>(AuthContext);
    const localTabs = [
      
      "Suggested",
      "Following",
      
    ];
    const date=[
      {
        index:0,
        action:"Suggested",
        name:"post",
        _id:""
      },
      {
        index:1,
        action:"Following",
        name:"post",
        _id:""
      },
      {
        index:2,
        action:"Saved post",
        name:"post",
        _id:""
      }
    ]
    const [tabs,setTabs]=useState([
      ...date,
      ...userObj.communities.map((item:any,index:number)=>(
        {
          index:index+3,
          action:item.name,
          name:"communities",
          _id:item._id
        }
    ))
  ])
  return (
    <div className="w-full min-h-full h-auto">
      {/* <div className="flex flex-col justify-center relative py-2 px-0 mobile:pl-20 mobile:pr-12 mobile:py-4 overflow-x-hidden resize-none">
           
            <div className="w-full relative overflow-x-auto flex flex-col h-12 no-scrollbar p-2">
              
              <div className="flex min-w-full justify-center absolute m-auto w-fit gap-2 px-2">
                  {tabs.map((tab, index) => (
                      <button
                          key={index}
                          className={`whitespace-nowrap text-center text-sm text-nowrap h-8 rounded-lg px-3 bg-[hsl(var(--accent))] ${
                          activeTab === index ? "bg-black text-white dark:bg-white dark:text-black" : "text-[#777777]"
                          }`}
                          onClick={()=>setActiveTab(index)}
                      >
                          {tab}
                      </button>
                  ))}
              </div> 
                  
                  
            </div>

            
            
          </div>   */}

      <div className="flex justify-center min-h-full">
        <div className="w-full max-w-[568px] min-h-full">
          <div className="w-full min-h-full">
            
            <Tabs
              tabs={tabs}
              state={activeTab}
              setState={setActiveTab}
            />
            <Example />
            {/* { results?.map(item=><Feed dave={item} key={item._id}/>)} */}
            {activeTab === tabs[activeTab].index && tabs[activeTab].name==="post" && tabs[activeTab].action==="Suggested" && <SuggestedPost />}
            {activeTab === tabs[activeTab].index && tabs[activeTab].name==="post" && tabs[activeTab].action==="Following" && <FollowingPosts />}
            {/* {activeTab === 2 && <NewestPosts />} */}
            {activeTab === tabs[activeTab].index && tabs[activeTab].name==="post" && tabs[activeTab].action==="Saved post" && <SavedPosts />}
            {/* {userObj?.user && activeTab === 4 && (
              <PostedByYou username={userObj.user.username} />
            )} */}
            {activeTab === tabs[activeTab].index && tabs[activeTab].name==="communities" && <CommunityPost communityId={tabs[activeTab]._id} />}
          </div>
        </div>
      </div>
    </div>
  );
}
