import Feed from "../feed"
// import { cookies } from "next/headers";
import getPosts from "../../../../lib/posts/getPosts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/Authcontext";
import CommentSkeleton from "../comment/CommentSkeleton";

export default function NewestPosts() {
    const {cook} :any=useContext(AuthContext)
    const rf :string | undefined=cook.refreshTkn
    const ac:string | undefined=cook.accessTkn
    const [newest,setNewest]=useState<HomeFeed[] | null>([])
    // console.log("hello world",rf,ac)
    let dataA :string[]=[]
    async function petch(){
        const data : Promise<Post>=await getPosts(dataA,"posts/newest",rf,ac) 
        const results: HomeFeed[] | undefined = await (await data)?.posts;
        if (results ){
            setNewest([...(newest || []) ,...results])
        }
    }
    useEffect(()=>{
        petch()
    },[])
    return (
        <div className="flex flex-col">  
            { newest?.map((item:HomeFeed)=><Feed dave={item} key={item._id}/>)}

            <CommentSkeleton onVisible={() => petch()}/>
        </div>
    )
}
