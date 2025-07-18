"use client"
import { useContext, useEffect, useState } from "react"
import getPosts from "../../../../lib/posts/getPosts"
import Feed from "../feed"
import { AuthContext } from "@/app/context/Authcontext"
import CommentSkeleton from "../comment/CommentSkeleton"

export default function SavedPosts() {
    const [posts,setPosts]=useState<HomeFeed[] | []>([])
    const {userObj} :any=useContext(AuthContext)
    var postId :any=posts.length ? posts.map((item:HomeFeed)=>{
        if (item._id){
            return item._id
        }
    }):[]
    async function petch(){
        const data : Promise<HomeFeed[] | undefined>=await getPosts(postId,"posts/getflags","rf","ac") 
        const results=await data
        if (results?.length ){
            setPosts([...posts ,...results])
        }
    }
    useEffect(()=>{
        petch()
    },[])
    useEffect(()=>{
        postId=posts.length ? posts.map((item:HomeFeed)=>{
            if (item._id){
                return item._id
            }
        }):[]
    },[posts])
    
    return (
        <div className="flex flex-col">
            {userObj?.user&& posts?.map((item:HomeFeed,index:number)=><Feed dave={item} key={index}/>)}
            <CommentSkeleton onVisible={() => petch()}/>
        </div>
    )
}
