"use client"
import Link from "next/link"

type Prop={
    commentObj:PostComment
}

export default function Comments({commentObj}:Prop) {
  function time(date: string): string {
        const now = new Date();
        const past = new Date(date);
        const diff = now.getTime() - past.getTime();

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 7) {
            return past.toLocaleString('en-US', { month: 'short', day: 'numeric' });
        } else if (days > 0) {
            return days + (days === 1 ? 'd' : 'd');
        } else if (hours > 0) {
            return hours + (hours === 1 ? 'h' : 'h');
        } else if (minutes > 0) {
            return minutes + (minutes === 1 ? 'm' : 'm');
        } else {
            return seconds + (seconds === 1 ? 's' : 's');
        }
    }
    const longFormatTime=(ISODATE:string):{
      longDate:string,
      longTime:string
    }=>{
    const isoDate = "2025-04-13T17:53:47.479Z";
    const date = new Date(ISODATE);
    const longDate = date.toLocaleDateString("en-US", {
      
      year: "numeric",
      month: "short",
      day: "numeric",
    }); 
    const longTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      // timeZoneName: "short",
      // timeZone: "Africa/Lagos", 
    });
    return {longDate,longTime} 
     // Output: Sunday, April 13, 2025, 5:53:47 PM UTC
  }
  return (
    <div className="flex flex-col relative border-b border-solid border-[hsl(var(--border-color))] last:border-none last:border-b-0">
        <div className="flex flex-col py-5 w-full"  role="article">
            <div className="gap-3 flex item-start w-full px-4 lg:px-0">
            <Link href={""}>
                <div className="w-9 h-9 rounded-[50%] border border-[hsl(var(--border-color))] bg-[hsl(var(--accent))]">
                    <img
                        alt={commentObj.user.name}
                        src={commentObj.user.profileImage ? commentObj.user.profileImage:'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png'}
                        className="h-full w-full object-cover object-center rounded-full"
                    />
                </div>
            </Link>
            <div className="w-full flex flex-col">
                <div className="w-full  flex flex-col gap-2">
                
                    <div className="gap-1 flex flex-col">
                        <div className="flex flex-col">
                            <div className="flex justify-between gap-2">
                                <div className="flex items-center w-full h-full">
                                    <div className="w-full h-full tracking-wide decoration-0 flex">
                                        <div className="flex justify-between gap-2">
                                            <div className="flex">
                                                <span className="text-black w-full overflow-ellipsis whitespace-nowrap font-[500] dark:text-[#EEEEEE] text-[15px] decoration-0 overflow-hidden ">
                                                    <Link
                                                        href={"/"+ commentObj.user.username}
                                                        className="hover:underline decoration-0"
                                                    >
                                                        {commentObj.user.name}
                                                    </Link>
                                                </span>
                                            </div>
                                            <span className="">
                                                <span className="text-[13px] text-[#727272] whitespace-nowrap ">
                                                    <Link
                                                        title={longFormatTime(commentObj.createdAt).longDate +" "+longFormatTime(commentObj.createdAt).longTime }
                                                        href={"/"+ commentObj.user.username}
                                                        className=""
                                                        
                                                    >
                                                        
                                                        {time(commentObj.createdAt)}
                                                        
                                                    </Link>
                                                </span>
                                            </span>
                                        </div>
                                       
                                    </div>
                                    
                                
                                </div>
                            <div className="flex gap-2">
                                
                                <div className="flex items-center">
                                    <div
                                    id="trigger5"
                                    aria-expanded="false"
                                    aria-haspopup="dialog"
                                    aria-controls="dialog6"
                                    aria-label="View more"
                                    className="flex items-center"
                                    >
                                    <button
                                        tab-index="0"
                                        type="button"
                                        aria-label="More options"
                                        className=""
                                    >
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className=" stroke-gray-900 dark:stroke-gray-200"
                                        >
                                        <circle cx="12" cy="12" r="1"></circle>
                                        <circle cx="19" cy="12" r="1"></circle>
                                        <circle cx="5" cy="12" r="1"></circle>
                                        </svg>
                                    </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                            {/* <span className="text-[#727272] text-[15px]">
                                <Link
                                    href="/@oyinosikoya?"
                                    className=""
                                >
                                    @oyinosikoya
                                </Link>
                            </span> */}
                        </div>
                        <div className="flex">
                            <div className="flex">
                                <div className="flex">
                                    <p className={`text-[--color] font-[400] break-all break-words w-full opacity-80 overflow-ellipsis text-[15px] whitespace-pre-wrap tracking-wide decoration-0`}>
                                        {commentObj.text && commentObj.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {commentObj.img?.length ?
                        <div className="block overflow-hidden w-full cursor-wait" tabIndex={1}>
                            <div draggable="false" tabIndex={2} className={`cursor-not-allowed flex bg-[hsl(var(--accent))] object-cover bg-center w-fit bg-cover  h-auto overflow-hidden min-w-20 rounded-xl relative border border-[hsl(var(--border-color))] border-solid `}>
                                <img src={commentObj?.img[0]} className="max-h-[400px] max-w-full w-auto h-auto object-cover object-center invisible" />
                            </div>
                        </div>
                        // <ContentWrapper param={dave.img}/>
                        :<></>
                       
                    }
                    <div className="gap-2 flex justify-between">
                        <div className="flex gap-[15px]">
                            <span className="flex ml-[-8px] ">
                                <button className="flex gap-[6px] px-2 h-8 text-[#727272] hover:text-[--color] items-center hover:bg-[hsl(var(--accent))] rounded-[20px]">
                                    <svg viewBox="0 0 20 20" stroke="currentColor" fill="none" className="h-5 w-5 stroke-[1.5]"><path d="M5.00002 2.54822C8.00003 2.09722 9.58337 4.93428 10 5.87387C10.4167 4.93428 12 2.09722 15 2.54822C18 2.99923 18.75 5.66154 18.75 7.05826C18.75 9.28572 18.1249 10.9821 16.2499 13.244C14.3749 15.506 10 18.3333 10 18.3333C10 18.3333 5.62498 15.506 3.74999 13.244C1.875 10.9821 1.25 9.28572 1.25 7.05826C1.25 5.66154 2 2.99923 5.00002 2.54822Z"></path></svg>
                                        {commentObj.likes.length? <span className="text-sm">{commentObj.likes.length}</span>:<></>}
                                </button>
                            </span>
                            <span className="flex ml-[-8px] ">
                                <button className="flex gap-[6px] text-[#727272] hover:text-[--color] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] rounded-[20px]">
                                    <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                                    {commentObj.replies.length? <span className="text-sm">{commentObj.replies.length}</span>:<></>}
                                </button>
                            </span>
                            <span className="flex ml-[-8px] ">
                                <button className="flex gap-[6px] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] rounded-[20px]">
                                    <svg role="img" width="20" height="20" viewBox="0 0 20 20" fill="none" strokeWidth="1.5" stroke="#727272" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><g><title></title><path d="M2.53001 7.81595C3.49179 4.73911 6.43281 2.5 9.91173 2.5C13.1684 2.5 15.9537 4.46214 17.0852 7.23684L17.6179 8.67647M17.6179 8.67647L18.5002 4.26471M17.6179 8.67647L13.6473 6.91176M17.4995 12.1841C16.5378 15.2609 13.5967 17.5 10.1178 17.5C6.86118 17.5 4.07589 15.5379 2.94432 12.7632L2.41165 11.3235M2.41165 11.3235L1.5293 15.7353M2.41165 11.3235L6.38224 13.0882"></path></g></svg>
                                    {commentObj.views.length? <span className="text-sm text-[#727272]">{commentObj.views.length}</span>:<></>}
                                </button>
                            </span>
                        
                        </div>
                        <div>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
  )
}
 