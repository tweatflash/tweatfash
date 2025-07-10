import Link from "next/link";
import getSinglePost from "../../../../../../lib/posts/getSinglePost";
import PostsComments from "@/app/components/posts/postsComments";
import ContentWrapper from "@/app/components/contentWrapper";

type Props = {
  params: {
    postId: string,
  };
};
export async function generateMetadata({ params: { postId } }: Props) {
  const userProfile: Promise<SinglePostObj> = await await getSinglePost(postId);
  const data=  (await userProfile)?.posts
  const result:undefined | SinglePost[]=data
  
  if (result?.length){
    return {
      title:` ${result[0].user.name} on Tweatflash : "${result[0].text?result[0].text:""}"`,
      description:`${result[0].user.name} on Tweatflash "${result[0].text?result[0].text:""}"`,
      openGraph: {
          title:result[0].user.name +""+ "on Tweatflash",
          descrition:result[0].text?result[0].text:"",
          images: result[0].img.length? result[0].img[0] :"",
          site_name:"Tweatflash"
      },
      twitter: {
          card: "summary_large_image",
          images: result[0].img.length? result[0].img[0] :"",
          title:result[0].user.name +""+ "on Tweatflash",
          descrition:result[0].text?result[0].text:"",
      },
    }
  }

  return {
    title: 'No results for'+"",
    description: 'No results for '+"" +""+'found',
  };
};

export default async function page({params:{postId}}:Props) {
  const singlePostObj: Promise<SinglePostObj> = await getSinglePost(postId);
  const data=  (await singlePostObj)?.posts
  const result:undefined | SinglePost[]=data
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
  if (result===undefined || result?.length ==0) return <h1>Error Page no user found</h1>
  return (
    <div className="w-full h-auto"> 
      <div className="flex flex-col justify-center relative">
        <div className="flex justify-center"> 
          <div className="w-full max-w-[568px]">
            <div className="w-full pt-4 text-[--color] flex flex-col gap-5">
              <div className="w-full mobile:px-0 px-4 ">
                <div className="pt-4 w-full gap-3 flex flex-col">
                  <div className="h-auto flex flex-row gap-3 justify-between w-full items-center">
                    <Link href={"/"+result[0].user.username} className="flex">
                      <div className="flex w-auto">
                        <div className="size-[40px] bg-[hsl(var(--accent))] rounded-full">
                          <img
                              alt={result[0].user.name}
                              src={result[0].user.profileImage ? result[0].user.profileImage:"https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"}
                              className="h-full w-full object-cover object-center rounded-full"
                          />
                        </div>
                      </div>
                    </Link>
                    <div className="flex flex-col flex-1 leading-5">
                      <div className="flex justify-between gap-2">
                          <div className="flex gap-3 items-center">
                              <span className="font-[500] tracking-wide decoration-0">
                                  
                                      <span className="text-black  dark:text-[#EEEEEE] text-[15px] decoration-0">
                                          <Link
                                              href={"/"+result[0].user.username}
                                              className="hover:underline decoration-0"
                                          >
                                          {result[0].user.name}
                                          </Link>
                                      </span>
                                  
                              </span>
                              <span className="">
                                  <span className="text-[13px] text-[#727272]">
                                      <Link
                                          title="Apr 23, 2025, 10:04 AM"
                                          href={"/"+result[0].user.username}
                                          className=""
                                          
                                      >
                                          
                                          {time(result[0].createdAt)}
                                          
                                      </Link>
                                  </span>
                              </span>
                          
                          </div>
                      </div>
                      <span className="text-[#727272] text-sm">
                          <Link
                              href="/@oyinosikoya?"
                              className=""
                          >
                              {result[0].user.username}
                          </Link>
                      </span>
                    </div>
                    <div className="flex gap-2">
                        <span className="h-fit font-bold inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                            200 Aura
                        </span>
                        <div className="flex items-center">
                            <div
                            
                              aria-label="View more"
                              className="flex items-center h-full aspect-square"
                            >
                            <button
                                tab-index="0"
                                type="button"
                                aria-label="More options"
                                className="hover:bg-[hsl(var(--accent))] size-full flex justify-center items-center rounded-lg"
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
                  {result[0].text &&
                    <div className="flex">
                        <div className="flex">
                            <div className="flex">
                                <p className={`text-black dark:text-[#EEEEEE] font-[400] text-[15px] whitespace-pre-wrap tracking-wide decoration-0`}>
                                    {result[0].text}
                                </p>
                            </div>
                        </div>
                    </div>
                  }
                  <ContentWrapper param={result[0]} />
                  <div className="gap-2 flex justify-between">
                        <div className="flex gap-[15px] flex-1">
                            <span className="flex ml-[-8px] ">
                                <button className="flex gap-[6px] stroke-[#727272] hover:stroke-[--color] text-[#727272] hover:text-[--color] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] rounded-[20px]">
                                    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 stroke-[1.5]"><path d="M5.00002 2.54822C8.00003 2.09722 9.58337 4.93428 10 5.87387C10.4167 4.93428 12 2.09722 15 2.54822C18 2.99923 18.75 5.66154 18.75 7.05826C18.75 9.28572 18.1249 10.9821 16.2499 13.244C14.3749 15.506 10 18.3333 10 18.3333C10 18.3333 5.62498 15.506 3.74999 13.244C1.875 10.9821 1.25 9.28572 1.25 7.05826C1.25 5.66154 2 2.99923 5.00002 2.54822Z"></path></svg>
                                    {result[0].likesCount? <span className="text-sm ">{result[0].likesCount}</span>:<></>}
                                </button>
                            </span>
                            <span className="flex ml-[-8px] ">
                                <button className="flex gap-[6px] fill-[#727272] hover:fill-[--color] text-[#727272] hover:text-[--color] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] rounded-[20px]">
                                <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                                {result[0].commentCount? <span className="text-sm">{result[0].commentCount}</span>:<></>}
                                </button>
                            </span>
                            <span className="flex ml-[-8px] ">
                                <button className="flex gap-[6px] stroke-[#727272] hover:stroke-[--color] text-[#727272] hover:text-[--color] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] rounded-[20px]">
                                    <svg role="img" width="20" height="20" viewBox="0 0 20 20" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><g><title></title><path d="M2.53001 7.81595C3.49179 4.73911 6.43281 2.5 9.91173 2.5C13.1684 2.5 15.9537 4.46214 17.0852 7.23684L17.6179 8.67647M17.6179 8.67647L18.5002 4.26471M17.6179 8.67647L13.6473 6.91176M17.4995 12.1841C16.5378 15.2609 13.5967 17.5 10.1178 17.5C6.86118 17.5 4.07589 15.5379 2.94432 12.7632L2.41165 11.3235M2.41165 11.3235L1.5293 15.7353M2.41165 11.3235L6.38224 13.0882"></path></g></svg>
                                    {result[0].reposts.length? <span className="text-sm">{result[0].reposts.length}</span>:<></>}
                                </button>
                            </span>
                        
                        </div>
                        <div className="flex flex-row gap-3">
                           <span className="flex ml-[-8px] ">
                                <button className="fill-[#727272] hover:fill-[--color] flex gap-[6px] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] rounded-[20px]">
                                  <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="size-5"
                                    role="img"
                                  >
                                    <g>
                                      <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
                                    </g>
                                  </svg>
                                    
                                </button>
                            </span>
                            <span className="flex ml-[-8px] ">
                                <button className="flex gap-[6px] stroke-[#727272] hover:stroke-[--color] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] rounded-[20px]">
                                    <svg
                                      role="img"
                                      className="size-5"
                                      viewBox="0 0 20 20" 
                                      fill="none" 
                                      strokeWidth="1.5" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round" 
                                      xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                          <title></title>
                                          <path d="M10.2171 2.2793L10.2171 12.9745M10.2171 2.2793L13.333 4.99984M10.2171 2.2793L7.08301 4.99984M2.49967 10.9925L2.49967 14.1592C2.49967 16.011 4.00084 17.5121 5.85261 17.5121L14.9801 17.5121C16.8318 17.5121 18.333 16.011 18.333 14.1592L18.333 10.9925"></path>
                                      </g>
                                    </svg>
                                </button>
                            </span>
                        </div>
                  </div>
                  <div className="border-b border-t py-4 border-[hsl(var(--border-color))]">
                    <div className="flex flex-row gap-2">
                      <div className="flex items-center">
                        <div className="decoration-0 text-[#727272] text-sm flex gap-1">
                          <span>
                            {longFormatTime(result[0].createdAt).longDate}
                          </span>
                          <span>
                             at  
                          </span>
                          <span>
                            {longFormatTime(result[0].createdAt).longTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center flex-row">
                        <div className="text-sm px-2 cursor-pointer py-[2px] bg-[hsl(var(--accent))] rounded-lg text-[#727272] hover:text-[--color]">
                          <span>{result[0].likesCount} likes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              <div className="w-full mobile:px-0 px-4 ">
                  <div className="w-full h-auto rounded-xl bg-[hsl(var(--accent))] px-4 py-3 flex flex-row gap-2 items-center">
                    <div className="size-9 rounded-full bg-red-50"></div>
                    <div className="flex-1 flex justify-between">
                      <div className="flex">
                        <p className="text-[#727272] text-md">Leave a suggestion... </p>
                      </div>
                      {/* <div>
                        <button className="px-4 py-1 rounded-2xl bg-[--color]">Post</button>
                      </div> */}
                    </div>
                  </div>
              </div>
              <div className="w-full flex flex-col ">
                  <PostsComments commentId={result[0]._id}/>
              </div>
            </div>
          </div>
         
        </div>  
      </div>
    </div>
  )
}
