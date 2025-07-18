import Feed from "../feed"
// import { cookies } from "next/headers";
import getPostSkipCount from "../../../../lib/posts/getPostSkipCount";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/Authcontext";
import CommentSkeleton from "../comment/CommentSkeleton";
export default function FollowingPosts() {
    const {cook,following,setFollowing} :any=useContext(AuthContext)
    const rf :string | undefined=cook.refreshTkn
    const ac:string | undefined=cook.accessTkn
    const [posts,setPosts]=useState<HomeFeed[] | null>(null)
    // console.log("hello world",rf,ac)
    let dataA :string[]=[]
    async function petch(){
        const data : Promise<Post>=await getPostSkipCount(0,"following",rf,ac) 
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

            <CommentSkeleton onVisible={() => petch()}/>
        </div>
    )
}
