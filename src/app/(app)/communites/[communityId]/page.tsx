import getEachCommunity from "../../../../../lib/getEachCommunity";
import CommunityCompartment from "@/app/components/posts/communityCompartment";

type Props = {
  params: {
    communityId: string;
  };
};
export async function generateMetadata({ params: { communityId } }: Props) {
  const communityProfile: Promise<EachCommRes> = await getEachCommunity(communityId);
  const data = await communityProfile;
  if (!data) {
    return {
      title: 'No results for this community',
      description: 'No results for this community found found',
    };
  }
  return {
    title: `${data.community.name} Community ` +' | Tweatflash',
    description: `${data.community.name} Community ` +' | Tweatflash',
    openGraph: {
        images: data.community.profileImage,
    },
    twitter: {
        card: "summary_large_image",
        images: data.community.profileImage,
    },
  };
}
export default async function EachCommunity({ params: { communityId } }: Props) {
    const communityProfile: Promise<EachCommRes> = await getEachCommunity(communityId);
    const data : EachComm = (await communityProfile)?.community;
    if (!data) return <h1>Error Page no user found</h1>
    
    return (
        <div className="w-full h-auto"> 
      <div className="flex flex-col justify-center relative">
        <div className="flex justify-center"> 
          <div className="w-full max-w-[568px]">
            <div className="w-full feedMax:pt-4">
              
              <div className="flex flex-col border-b border-[hsl(var(--border-color))]">
                  <div className="flex-col relative overflow-hidden max-h-40">
                    <div className='pb-[30.3333%] '></div>
                    <div className="absolute feedMax:rounded-lg w-full h-full bg-[hsl(var(--accent))] top-0"></div>

                  </div>
                  <div className='flex flex-col gap-3 mb-4 p-4 pt-0 mobile:pl-0 mobile:pr-0'>
                    <div className="flex flex-wrap justify-between mobile:pl-4 mobile:pr-4">
                      {/* <div className='min-w-[48px] relative mt-[-10%] w-[20%]'>
                        <div className='pb-[100%]'></div>
                        <div className="absolute top-0  w-full h-full rounded-full bg-[hsl(var(--background))] p-1 flex overflow-hidden">
                          <div className="bg-[hsl(var(--accent))] w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                            <img src={data.profileImage? data.profileImage : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png'} className='object-cover object-center w-full h-full' alt='profile image'/>
                          </div>
                        </div>
                      </div> */}
                      <div>
                      {/* <Link className="rounded-full bg-gray-950 px-2.5 py-0.5 text-sm/6 font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950" href="/plus#pricing">Get full access</Link> */}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className='text-2xl font-[boldCal] dark:text-[rgb(225,225,225)]'>{data.name}</h3>
                      
                      <div className=''>
                        <span className="dark:text-[rgb(225,225,225)] text-[15px] ">
                          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore neque non perferendis. 
                        </span>
                      </div>
                      <div className="flex-1">
                        <div
                            
                            className="ml-[-10px] hover:bg-[hsl(var(--accent))] rounded-2xl px-3 py-[6px] font-[500] w-fit  flex items-center text-[--color]"
                            >
                             <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="dark:fill-[#727272] fill-black size-5 me-1"
                            >
                                <g>
                                <path d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9c-.799 0-1.527-.279-2.116-.73-.836-.64-1.384-1.638-1.384-2.77 0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z"></path>
                                </g>
                            </svg>
                            <span className="flex items-center text-[16px]">745.3k</span>
                        </div>

                      </div>
                      <div className="flex-1 flex flex-w">
                        {data.categories.map((item,index)=>(
                            <button
                                type="button"
                                key={index}
                                className="border outline-none border-[hsl(var(--border-color))] text-[--color] font-medium text-sm rounded-full px-3 py-[3px] text-center inline-flex items-center me-2 mb-2"
                            >
                            
                                {item}
                            </button>
                        ))}
                        
                      </div>
                    </div>
                    <div className="flex flex-row flex-grow gap-2 justify-end">
                        <div className="flex-1 flex-col">
                            <button type="button" className="px-4 w-full h-full bg-[#4070f4] rounded-lg font-[500] text-white text-[15px]">Request Join</button>
                        </div>
                        <div className="flex-1 flex-col">
                            <button type="button" className=" w-full h-full bg-[hsl(var(--accent))] rounded-lg text-black dark:text-white text-[15px]">Copy Link</button>
                        </div>
                        <div className="flex flex-col">
                            <button type="button" className="bg-[hsl(var(--accent))] flex justify-center items-center rounded-lg w-10 aspect-square">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                // stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="stroke-black dark:stroke-white"
                              >
                                <circle cx={12} cy={12} r={1} />
                                <circle cx={19} cy={12} r={1} />
                                <circle cx={5} cy={12} r={1} />
                                  </svg>

                            </button>
                        </div>
                        <div className="flex flex-col">
                            <button type="button" className="bg-[hsl(var(--accent))] flex justify-center items-center rounded-lg w-10 aspect-square">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-black dark:stroke-white"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                            </button>
                        </div>
                    </div>
                  </div>
                  <CommunityCompartment communityId={"tweatflash"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
