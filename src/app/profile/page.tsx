"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import { AuthContext } from '../context/Authcontext'

export default function profile() {
  const { userObj } :any= useContext(AuthContext)
  return (
    <div className="w-full h-auto"> 
      <div className="flex flex-col justify-center relative">
        <div className="flex justify-center"> 
          <div className="w-full max-w-[568px]">
            <div className="w-full">
              
              <div className="flex flex-col">
                  <div className="flex-col relative overflow-hidden max-h-40">
                    <div className='pb-[33.3333%] '></div>
                    <div className="absolute w-full h-full bg-[hsl(var(--accent))] top-0"></div>

                  </div>
                  <div className='flex flex-col mb-4 p-4 mobile:pl-0 mobile:pr-0'>
                    <div className="flex flex-wrap justify-between mobile:pl-4 mobile:pr-4">
                      <div className='min-w-[48px] relative mt-[-15%] w-[25%] mb-3'>
                        <div className='pb-[100%]'></div>
                        <div className="absolute top-0  w-full h-full rounded-full bg-[hsl(var(--background))] p-1 flex overflow-hidden">
                          <div className="bg-[hsl(var(--accent))] w-full h-full rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h3 className='text-2xl dark:text-[rgb(225,225,225)] font-bold'>{userObj.user.name}</h3>
                      <div>
                        <span className="text-[#727272] text-[15px] ">
                          @{userObj.user.username}
                        </span>
                      </div>
                      <div className='mb-2'>
                        <span className="dark:text-[rgb(225,225,225)] text-[15px] ">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati eaque voluptate beatae totam.
                        </span>
                      </div>
                      <div className="flex flex-row gap-4">
                        <Link href={"#"} className="text-[15px] text-[#727272] hover:underline">
                          <span className="font-bold">{userObj.user.followers.length}</span> Followers
                        </Link>
                        <Link href={"#"} className="text-[15px] text-[#727272] hover:underline">
                          <span className="font-bold">{userObj.user.following.length}</span> Following
                        </Link>
                        <Link href={"#"} className="text-[15px] text-[#727272] hover:underline">
                          <span className="font-bold">0</span> Friends
                        </Link>
                      </div>
                    </div>
                  </div>
                  

                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul className="flex flex-row justify-center -mb-px">
                        <li className="flex-1 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                            <a href="#" className="inline-block pb-2 ">Profile</a>
                        </li>
                        <li className="flex-1 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500">
                            <a href="#" className="inline-block pb-2 " aria-current="page">Dashboard</a>
                        </li>
                        <li className="flex-1 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                            <a href="#" className="inline-block pb-2 ">Settings</a>
                        </li>
                        <li className="flex-1 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                            <a href="#" className="inline-block pb-2 ">Contacts</a>
                        </li>
                        {/* <li>
                             <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
                        </li> */}
                    </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
