import Link from 'next/link'
import React from 'react'
type Param={
    userObj:Person
}
export default function person({userObj}:Param) {
  return (
    <div className="flex-1 flex flex-row gap-3 p-2" >
        <div className="flex-1 flex flex-row gap-3">
            <div className="flex">
            <Link href={"/"+userObj.username}>
                <div className="size-10 bg-[hsl(var(--accent))] rounded-full">
                    <img
                        alt={""}
                        src={"https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"}
                        className="h-full w-full object-cover object-center rounded-full"
                    />
                    
                </div>
            </Link>
            </div>
            <div className="flex-1 flex flex-col h-fit">
            <Link href={"/"+userObj.username} className="contents">
                <div className="flex flex-col flex-1 leading-5">
                <div className="flex justify-between gap-2">
                    <div className="flex gap-3 items-center">
                    <span className="font-[500] tracking-wide decoration-0">
                        <span className="text-black  dark:text-[#EEEEEE] text-[15px] decoration-0">
                        <div className="hover:underline decoration-0">
                            {userObj.name}
                        </div>
                        </span>
                    </span>
                    
                    </div>
                </div>
                <span className="text-[#727272] text-sm">
                    <div className="">
                    @{userObj.username}
                    </div>
                </span>
                </div>
                <div className="w-full relative">
                    <span className="text-[--color] text-[15px] w-full overflow-hidden whitespace-nowrap absolute overflow-ellipsis">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </span>
                </div>
            </Link>
            </div>
        </div>
        <button className="px-4 h-fit rounded-full py-1 text-white bg-[#4070f4] text-[15px] ">
            Follow
        </button>
    </div>
  )
}
