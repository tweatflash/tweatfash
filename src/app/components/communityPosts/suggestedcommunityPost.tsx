import { useEffect, useState } from "react";
import getPosts from "../../../../lib/posts/getPosts";
import CommunityFeed from "../communityFeed";

export default function SuggestedCommunityPost() {
    const [posts,setPosts]=useState<CommunityPost[] | null>(null)
    let postId :string[] | any
    postId=posts?.map((item:CommunityPost)=>{
        if (item._id){
            return item._id
        }else {
            return []
        }
    })
    async function petch(){
        const data : Promise<CommunityPost[] | undefined>=await getPosts(Array.isArray(postId) ? postId :[],"communityposts/exploreCommunity","rf","ac")
        const results = await (await data);
        if (results?.length ){
            setPosts([...(posts || []) ,...results])
        }
    }
    useEffect(()=>{
        petch()
    },[])
    useEffect(()=>{
        postId=posts?.map((item:CommunityPost)=>{
            if (item._id){
                return item._id
            }else{
                return []
            }
      })
      console.log(postId)
    },[posts])
    
    return (
        <div className="flex flex-col">  
            { posts?.map((item,index) => (<CommunityFeed dave={item} key={index} />))}
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
