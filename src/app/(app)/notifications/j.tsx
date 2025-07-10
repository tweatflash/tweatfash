"use client"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useState ,useEffect} from 'react'
import getNotification from '../../../../lib/getNotifications'
import Link from 'next/link'
const categories = [
  {
    name: 'All',
    posts: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter? Use these Tailwind CSS stacked list components to organize things like user profiles, tasks, or other resources vertically with available user actions?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
  },
  {
    name: 'Unread',
    posts: [
      {
        id: 1,
        title: 'Use these Tailwind CSS stacked list components to organize things like user profiles, tasks, or other resources vertically with available user actions?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'These list components are designed and built by the Tailwind CSS team, and include a variety of different styles and layouts.',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
  },
  {
    name: 'Reposts',
    posts: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  },
  {
    name: 'Replies',
    posts: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  },
]

export default function Example() {
    const [activeTab,setActiveTab]=useState(0)
    const [notification,setNotification]=useState<any[] | []>([])
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
            return days +" "+ (days === 1 ? ' day' : 'days ago');
        } else if (hours > 0) {
            return hours +" "+ (hours === 1 ? ' hour' : 'hours ago');
        } else if (minutes > 0) {
            return minutes +" "+ (minutes === 1 ? ' min ago' : 'mins ago');
        } else {
            return seconds + (seconds === 1 ? 's' : 's');
        }
    }
    async function petch(){
        const data : Promise<Notifications[] | undefined>=await getNotification(0) 
        const results= await data
        const grouped:any = {};

        results?.forEach((notif) => {
          const key = `${notif.postId}-${notif.type}`;
          if (!grouped[key]) {
            grouped[key] = {
              notif,
              names: [notif.name],
            };
          } else {
            grouped[key].names.push(notif.name);
          }
        });

        setNotification(Object.values(grouped));

    }
    useEffect(()=>{
        petch()

    },[])
    return (
        <div className="flex  w-full justify-center  ">
            <div className="w-full ">
                <TabGroup>
                <TabList className="flex px-4">
                    {categories.map(({ name},index) => (
                    <Tab
                        key={name}
                        className={`rounded-full px-3 py-1 text-sm/6 font-semibold text-[--color] focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white dark:hover:bg-white/5 hover:bg-black/5 ${index==activeTab && "bg-[hsl(var(--accent))]"} data-selected:data-hover:bg-white/10`}
                        onClick={()=>setActiveTab(index)}
                    >
                        {name}
                    </Tab>
                    ))}
                </TabList>
                <TabPanels className="mt-3">
                    
                    
                      <TabPanel className="rounded-xl ">
                        <ul className='flex flex-col gap-3'>
                        {notification.map((post,index) => (
                            <li key={index} className="px-4 relative border-b border-[hsl(var(--border-color))] flex flex-row py-3 text-sm/6 transition dark:hover:bg- white/5 hover:bg- black/5 gap-3">

                            <div className=''>
                                <div className='size-8 bg-[rgba(235,87,87,.2)] text-[#eb5757] rounded-lg flex justify-center items-center'>
                                    <svg viewBox="0 0 20 20" stroke="none" fill="currentColor" className="size-5"><path d="M5.00002 2.54822C8.00003 2.09722 9.58337 4.93428 10 5.87387C10.4167 4.93428 12 2.09722 15 2.54822C18 2.99923 18.75 5.66154 18.75 7.05826C18.75 9.28572 18.1249 10.9821 16.2499 13.244C14.3749 15.506 10 18.3333 10 18.3333C10 18.3333 5.62498 15.506 3.74999 13.244C1.875 10.9821 1.25 9.28572 1.25 7.05826C1.25 5.66154 2 2.99923 5.00002 2.54822Z"></path></svg>
                                </div>
                            </div>
                            <div className='flex-1'>
                                <div className="font-semibold text-[--color] flex flex-col gap-3">
                                    <div className="flex -space-x-2">
                                        <Link href={""}>
                                            <img
                                                alt=""
                                                src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                                                className="inline-block size-8 rounded-full ring-2 ring-[hsl(var(--background))]"
                                            />
                                        </Link>
                                        <Link href={""}>
                                            <img
                                                alt=""
                                                src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                                                className="inline-block size-8 rounded-full ring-2 ring-[hsl(var(--background))]"
                                            />
                                        </Link>
                                        <Link href={""}>
                                            <img
                                                alt=""
                                                src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                                                className="inline-block size-8 rounded-full ring-2 ring-[hsl(var(--background))]"
                                            />
                                        </Link>
                                        
                                        
                                    </div>
                                    <div>
                                        <span className=''>
                                            {post.names.join(', ')}
                                        </span>
                                    </div>
                                </div>
                                <ul className="flex gap-2 text-[#727272]" aria-hidden="true">
                                    <li>{time(post.createdAt)}</li>
                                    {/* <li aria-hidden="true">&middot;</li> */}
                                    {/* <li>{post.} comments</li> */}
                                    {/* <li aria-hidden="true">&middot;</li> */}
                                    {/* <li>{post.shareCount} shares</li> */}
                                </ul>
                            </div>
                            </li>
                        ))}
                        </ul>
                    </TabPanel>
                    
                </TabPanels>
                </TabGroup>
            </div>
        </div>
    )
}
