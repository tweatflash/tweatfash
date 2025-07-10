"use client"
import { useEffect, useState } from "react"
import getPosts from "../../../../lib/posts/getPosts"
import Comments from "../comments/Comments"
import {MessageCircle} from 'lucide-react';
type CommentId={
    commentId:string
}

export default function PostsComments({commentId}:CommentId) {
    const [comment,setComment]=useState<PostComment[]>([])
    const [loading,setLoading]=useState(true)
    const [noComments,setNoComments]=useState(false)
    async function petch() {
        const data :Promise<PostCommentResponse> =await getPosts([],`posts/comments/${commentId}`,"","")
        const results:PostComment[] = (await data).comments;
        setNoComments(results?.length ===0)
        setComment([...comment,...results])
    }
    useEffect(()=>{
        petch()
    },[])
    return (
        <div className="flex flex-col">
            {
                comment.map((comment,index)=>(
                    <Comments commentObj={comment} key={index} />
                ))
            }
             {noComments ? (
                <div className="p-8 text-center text-gray-500">
                    <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No comments yet</p>
                    <p className="text-sm">Be the first to share your thoughts!</p>
                </div>
            ):
            
                <div className="flex-1 mobile:px-0 px-4">
                    <div className="mx-auto w-full max-w-[568px] p-4 px-0 border-b border-solid border-[hsl(var(--border-color))] last:border-none last:border-b-0">
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
                <div className="mx-auto w-full max-w-[568px] p-4 px-0 border-b border-solid border-[hsl(var(--border-color))] last:border-none last:border-b-0">
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
                <div className="mx-auto w-full max-w-[568px] p-4 px-0 border-b border-solid border-[hsl(var(--border-color))] last:border-none last:border-b-0">
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
            }
        </div>
    )
}
