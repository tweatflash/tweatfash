"use client"
import getExplorePosts from "../../../lib/explore"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Feed from "./feed"
type Param={
    suggestedData:string
}
export default function ExploreComponent({suggestedData}:Param) {
    const ref=Cookies.get("RFTFL")
    const acc=Cookies.get("ACTFL")
    const [posts,setPosts]=useState<HomeFeed[] | null>(null)
    async function petch(){
        const data : any=await getExplorePosts(suggestedData,ref,acc)
        const results = await data
        if (!results || results===undefined){
            console.log("undefined")
        }else{
            console.log(results)
            setPosts(results?.posts)
        }
    }
    useEffect(()=>{
        if (suggestedData){
            petch()
        }
    },[suggestedData])
    
    return (
        <div className="flex flex-col"> 
            {
                posts?.map((item:HomeFeed)=><Feed dave={item} key={item._id}/>)
            }
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
