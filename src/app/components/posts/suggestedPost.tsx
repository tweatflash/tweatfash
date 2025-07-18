import Feed from "../feed"
import getPosts from "../../../../lib/posts/getPosts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/Authcontext";
import CommentSkeleton from "../comment/CommentSkeleton";

type stri={
    _id:string,
    
}
export default function SuggestedPost() {
    const {cook,forYou,setForYou ,userObj} :any=useContext(AuthContext)
    const rf :string | undefined=cook?.refreshTkn
    const ac:string | undefined=cook?.accessTkn
    const [posts,setPosts]=useState<HomeFeed[] | null>(null)
    var postId :string[] | []=forYou?.length ? forYou.map((item:HomeFeed)=>{
        if (item._id){
            return item._id
        }
    }):[]
    let dataA :string[]=[]
    async function petch(){
        const data : Promise<Post>=await getPosts(postId,"posts/all",rf,ac) 
        const results: HomeFeed[] | undefined = await (await data)?.posts;
        if (results?.length ){
            setForYou([...(forYou || []) ,...results])
        }
    }
    useEffect(()=>{
        petch()
    },[])
    useEffect(()=>{
        postId=forYou?.length ? forYou.map((item:HomeFeed)=>{
        if (item._id){
            return item._id
        }
    }):[]
    //   console.log(postId)
    },[forYou])
    return (
        <div className="flex flex-col">  
            {userObj?.user&& forYou?.map((item:HomeFeed,index:number)=><Feed dave={item} key={item._id}/>)}

            <CommentSkeleton onVisible={() => petch()}/>
        </div>
    )
}
