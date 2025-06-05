import Feed from "../feed"
// import { cookies } from "next/headers";
import getPostSkipCount from "../../../../lib/posts/getPostSkipCount";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/Authcontext";
export default function PostedByYou() {
    const {cook,userObj} :any=useContext(AuthContext)
    const [myPosts,setMyPosts]=useState<HomeFeed[] | null>(null)
    let SkipCount :number=myPosts?.length || 0
    async function petch(){
        const data : Promise<Post>=await getPostSkipCount(SkipCount,`user/${userObj.user.username}`,"rf","ac") 
        const results: HomeFeed[] | undefined = await (await data)?.posts;
        if (results ){
            setMyPosts([...(myPosts || []) ,...results])
            
        }
        
    }
    useEffect(()=>{
        petch()
    },[])
    useEffect(()=>{
      SkipCount=myPosts?.length || 0
  },[myPosts])
    return (
        <div className="flex flex-col">  
            { myPosts?.map((item:HomeFeed)=><Feed dave={item} key={item._id}/>)}

            <div className="mx-auto w-full max-w-[568px] p-4 border-b border-solid border-[hsl(var(--border-color))] last:border-none last:border-b-0" onClick={()=>petch()}>
                <div className="flex animate-pulse space-x-4">
                    <div className="size-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex-1 space-y-6 py-1">
                    <div className="h-4 max-w-full w-32 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
                    <div className="space-y-3">
                        <div className="grid grid-rows-2 gap-y-3">
                            <div className="row-span-2 h-4 rounded-xl w-[50%] bg-gray-300 dark:bg-gray-700"></div>
                            <div className="row-span-1 h-4 rounded-xl w-[70%] bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                        <div className="h-4 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto w-full max-w-[568px] p-4 border-b border-solid border-[hsl(var(--border-color))] last:border-none last:border-b-0">
                <div className="flex animate-pulse space-x-4">
                    <div className="size-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex-1 space-y-6 py-1">
                    <div className="h-4 max-w-full w-32 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
                    <div className="space-y-3">
                        <div className="grid grid-rows-2 gap-y-3">
                            <div className="row-span-2 h-4 rounded-xl w-[50%] bg-gray-300 dark:bg-gray-700"></div>
                            <div className="row-span-1 h-4 rounded-xl w-[70%] bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                        <div className="h-4 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto w-full max-w-[568px] p-4 border-b border-solid border-[hsl(var(--border-color))] last:border-none last:border-b-0">
                <div className="flex animate-pulse space-x-4">
                    <div className="size-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex-1 space-y-6 py-1">
                    <div className="h-4 max-w-full w-32 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
                    <div className="space-y-3">
                        <div className="grid grid-rows-2 gap-y-3">
                            <div className="row-span-2 h-4 rounded-xl w-[50%] bg-gray-300 dark:bg-gray-700"></div>
                            <div className="row-span-1 h-4 rounded-xl w-[70%] bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                        <div className="h-4 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
