import Feed from "../feed"
import getPosts from "../../../../lib/posts/getPosts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/Authcontext";
import CommentSkeleton from "../comment/CommentSkeleton";
import PersonalCommunityFeed from "../personalCommunityFeed";

type Prop={
    communityId:string,
    
}
export default function CommunityPost({communityId}:Prop) {
    const {cook,forYou,setForYou ,userObj} :any=useContext(AuthContext)
    const rf :string | undefined=cook?.refreshTkn
    const ac:string | undefined=cook?.accessTkn
    const [posts,setPosts]=useState<CommunityFeed[] | null>(null)
    
    var postId :string[] | []=forYou?.length ? forYou.map((item:HomeFeed)=>{
        if (item._id){
            return item._id
        }
    }):[]
    let dataA :string[]=[]
    async function petch(){
        const data :  CommunityFeed[] | undefined=await getPosts("",`communityPosts/all/${communityId}`,rf,ac) 
        // const results: CommunityFeed[] | undefined = await (await data)?.posts;
        if (data?.length ){
            setPosts([...(posts || []) ,...data])
        }
        console.log(data)
    }
    
    useEffect(()=>{
        setPosts([])
        petch()
        
    },[communityId])
    
    return (
        <div className="flex flex-col">  
            {posts?.map((item:CommunityFeed,index:number)=><PersonalCommunityFeed dave={item} key={item._id+index}/>)}

            <CommentSkeleton onVisible={() => petch()}/>
        </div> 
    )
}
