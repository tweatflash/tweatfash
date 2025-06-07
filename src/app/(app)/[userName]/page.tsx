import Link from "next/link";
import getUserProfile from "../../../../lib/getUserProfie";
import SavedPosts from "@/app/components/posts/savedPosts";
import PostCompartment from "@/app/components/posts/postCompartment";
type Props = {
  params: {
    userName: string;
  };
};
export async function generateMetadata({ params: { userName } }: Props) {
  const userProfile: Promise<UsersType> = await getUserProfile(userName);
  const data = await userProfile;
  const displayTerm = userName.replace("%20", " ");
  if (!data) {
    return {
      title: 'No results for'+""+ userName,
      description: 'No results for '+""+ userName +""+'found',
    };
  }
  return {
    title: data.user.name +' | Tweatflash',
    description: 'tweatflash profile for' +""+ displayTerm,
    openGraph: {
        images: data.user.profileImage,
    },
    twitter: {
        card: "summary_large_image",
        images: data.user.profileImage,
    },
  };
}
export default async  function Username({ params: { userName } }: Props) {
    const profileData: Promise<UsersType> = await getUserProfile(userName);
    const result :Users =(await profileData)?.user
    
    if (!profileData) return <h1>Error Page no user found</h1>
    return ( 
        
    <div className="w-full h-auto"> 
      <div className="flex flex-col justify-center relative">
        <div className="flex justify-center"> 
          <div className="w-full max-w-[568px]">
            <div className="w-full feedMax:pt-4">
              
              <div className="flex flex-col">
                  <div className="flex-col relative overflow-hidden max-h-40">
                    <div className='pb-[33.3333%] '></div>
                    <div className="absolute feedMax:rounded-lg w-full h-full bg-[hsl(var(--accent))] top-0"></div>

                  </div>
                  <div className='flex flex-col gap-3 mb-4 p-4 pt-0 mobile:pl-0 mobile:pr-0'>
                    <div className="flex flex-wrap justify-between mobile:pl-4 mobile:pr-4">
                      <div className='min-w-[48px] relative mt-[-15%] w-[25%]'>
                        <div className='pb-[100%]'></div>
                        <div className="absolute top-0  w-full h-full rounded-full bg-[hsl(var(--background))] p-1 flex overflow-hidden">
                          <div className="bg-[hsl(var(--accent))] w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                            <img src={result.profileImage? result.profileImage : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png'} className='object-cover object-center w-full h-full' alt='profile image'/>
                          </div>
                        </div>
                      </div>
                      <div>
                      {/* <Link className="rounded-full bg-gray-950 px-2.5 py-0.5 text-sm/6 font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950" href="/plus#pricing">Get full access</Link> */}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h3 className='text-2xl font-[boldCal] dark:text-[rgb(225,225,225)]'>{result.name}</h3>
                      <div>
                        <span className="text-[#727272] text-[15px] ">
                          @{result.username}
                        </span>
                      </div>
                      <div className='mb-3'>
                        <span className="dark:text-[rgb(225,225,225)] text-[15px] ">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati eaque voluptate beatae totam.
                        </span>
                      </div>
                      <div className="flex flex-row gap-4">
                        <Link href={"#"} className="text-[14px] text-[#727272] hover:underline">
                          <span className="text-black dark:text-white">{result.followers.length}</span>&nbsp;Followers
                        </Link>
                        <Link href={"#"} className="text-[14px] text-[#727272] hover:underline">
                          <span className="text-black dark:text-white">{result.following.length}</span>&nbsp;Following
                        </Link>
                        <Link href={"#"} className="text-[14px] text-[#727272] hover:underline">
                          <span className="text-black dark:text-white">0</span>&nbsp;Friends
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-row flex-grow gap-2 justify-end">
                        <div className="flex-1 flex-col">
                            <button type="button" className="px-4 w-full h-full bg-[#4070f4] rounded-lg font-[500] text-white text-[15px]">follow</button>
                        </div>
                        <div className="flex-1 flex-col">
                            <button type="button" className=" w-full h-full bg-[hsl(var(--accent))] rounded-lg text-black dark:text-white text-[15px]">Add Freiend</button>
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
                    </div>
                  </div>
                  <PostCompartment username={userName}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
