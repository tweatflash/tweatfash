import Feed from "../feed"
// import { cookies } from "next/headers";
import getPosts from "../../../../lib/posts/getPosts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/Authcontext";

export default function FollowingPosts() {
    const {cook,following,setFollowing} :any=useContext(AuthContext)
    const rf :string | undefined=cook.refreshTkn
    const ac:string | undefined=cook.accessTkn
    const [posts,setPosts]=useState<HomeFeed[] | null>(null)
    // console.log("hello world",rf,ac)
    let dataA :string[]=[]
    async function petch(){
        const data : Promise<Post>=await getPosts(dataA,"following",rf,ac) 
        const results: HomeFeed[] | undefined = await (await data)?.posts;
        if (results ){
            setFollowing([...(following || []) ,...results])
        }
    }
    useEffect(()=>{
        petch()
    },[])
    return (
        <div className="flex flex-col">  
            { following?.map((item:HomeFeed)=><Feed dave={item} key={item._id}/>)}

            <div className="mx-auto w-full max-w-[568px] rounded-md p-4 border-b border-dashed border-[hsl(var(--border-color))] last:border-none last:border-b-0" onClick={()=>petch()}>
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
            <div className="mx-auto w-full max-w-[568px] rounded-md p-4 border-b border-dashed border-[hsl(var(--border-color))] last:border-none last:border-b-0">
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
            <div className="mx-auto w-full max-w-[568px] rounded-md p-4 border-b border-dashed border-[hsl(var(--border-color))] last:border-none last:border-b-0">
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
