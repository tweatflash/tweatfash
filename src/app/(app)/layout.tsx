"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { AuthContext, AuthProvider } from "../context/Authcontext";
import { useContext } from "react";
import CommandPalette from "./explore/[searchTerm]/command";
import { usePathname } from "next/navigation";
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const {userObj , openSearch , setOpenSearch}: any = useContext(AuthContext)
  const pathname = usePathname();
  const mainpathname =  pathname.split('/')[1];
  return (
    <div className="main-handler min-h-screen grid absolute t-0 l-0 r-0 b-0 w-full bg-[hsl(var(--background))]">
      <div className="flex flex-col border-r border-solid sticky top-0 left-0 w-full h-full border-[hsl(var(--border-color))] un-b p-3">
         <Link href="/" className="relative size-10 rounded-full overflow-hidden flex justify-center items-center ">
            <img
              className="size-full hidden z-30 mobile:flex absolute bg-white rounded-full border-[#4070f4]"
              alt="tweatflash logo"
              title="tweatflash"
              src="/tweatflash2.svg"
            />
          </Link>
      </div>

      {/* header */}
      <div className="flex flex-col w-full h-full border-b sticky  border-solid border-[hsl(var(--border-color))] top-0 z-20 bg-[hsl(var(--background)/.6)] backdrop-blur-md">
        
        <div className="fixed top-0 w-full px-4">
          <div className="container-wrapper">
            <div className="w-full flex h-14 mobile:h-16 items-center gap-2 md:gap-4">
              
              <div className="flex mobile:hidden items-center justify-between gap-1 w-full">
                <div className="p-2 hover:bg-[hsl(var(--accent))] rounded-full cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    className="!size-6 stroke-black dark:stroke-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 9h16.5m-16.5 6.75h16.5"
                    ></path>
                  </svg>
                </div>
                <div className="h-10 flex w-full items-center justify-between rounded-md">
                  <div className="h-full aspect-square p-1 ">
                    <Link href="/" className="w-full bg-white rounded-full h-full flex justify-center items-center">
                      <img
                        className="h-full w-full rounded-full "
                        alt="tweatflash logo"
                        title="tweatflash"
                        src="/tweatflash2.svg"
                      />
                    </Link>
                  </div>
                  <div className="h-full flex">
                    <button className="h-full aspect-square hover:bg-[hsl(var(--accent))] rounded-full flex justify-center items-center" onClick={()=>setOpenSearch(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-black dark:stroke-white"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                    </button>
                    <button className="h-full aspect-square hover:bg-[hsl(var(--accent))] rounded-full flex justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"className="stroke-black dark:stroke-white"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
                    </button>
                    
                  </div>
                </div>
                
              </div>
              <div className="h-full flex items-center gap-2 w-auto mobile:w-full">
                <div className="hidden h-full items-center gap-4 justify-between flex-1 w-[calc(100%-48px)] mobile:flex md:flex-none">
                  <div className="flex h-full items-center w-40">
                    <h1 className="font-[boldCal] text-black dark:text-white text-2xl">{mainpathname}</h1>
                  </div>
                  <div className="w-full flex justify-center">
                    <button className="inline-flex items-center gap-2 border border-[hsl(var(--border-color))] bg-[hsl(var(--accent))] px-4 py-2 relative h-8 max-w-[600px] w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none text-[#727272]" onClick={()=>setOpenSearch(true)}>
                     
                      <span className="mobile:inline-flex hidden">Search tweatflash...</span>
                      <div className="pointer-events-none absolute right-[0.3rem]  top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border border-[hsl(var(--border-color))] bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>K
                      </div>
                    </button>
                  </div>
                </div>
                <nav className="flex items-center gap-0.5">
                  <div className="h-9 w-9 rounded-full overflow-hidden border border-dashed border-[hsl(var(--border-color))]">
                     <img
                          alt={""}
                          src={"https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"}
                          className="h-full w-full object-cover object-center rounded-full"
                      />
                    <span className="sr-only">Profile</span>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* side nav */}
      <div className="flex flex-col un-b">
        <div className="hidden fixed w-[72px] mobile:flex flex-col h-[calc(100vh-50px)] left-0 top-[50px] border-r border-solid border-[hsl(var(--border-color))]">
          <nav className="w-full h-full ">
            <div className=" h-full flex items-center">
              <div className="w-full h-full">
                <div className="w-full h-[calc(100%-72px)] no-scrollbar overflow-auto flex items-center">
                  <div className="p-2 w-full grid gap-1">
                    <span className="w-full">
                      <Link href={"/home"} className="">
                        <div className="p-4 flex items-center rounded-3xl hover:bg-[hsl(var(--accent))] ">
                          {
                            mainpathname==="home" ?
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="stroke-black fill-black dark:stroke-white dark:fill-white"
                            >
                              <g>
                                <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"></path>
                              </g>
                            </svg>:
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="dark:fill-white"
                            >
                              <g>
                                <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z" />
                              </g>
                            </svg>
                            
                          }
                          
                        </div>
                      </Link>
                    </span>
                    <span>
                      <div className="cursor-pointer" onClick={()=>setOpenSearch(true)}>
                        <div className="p-4 flex items-center rounded-3xl hover:bg-[hsl(var(--accent))]">
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="fill-black dark:fill-white"
                          >
                            <g>
                              <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </span>
                    <span>
                      <Link href={"/notifications"}>
                        <div className="p-4 flex items-center rounded-3xl hover:bg-[hsl(var(--accent))]">
                         {mainpathname==="notifications"?
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="dark:fill-white"
                          >
                            <g>
                              <path d="M11.996 2c-4.062 0-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958C19.48 5.017 16.054 2 11.996 2zM9.171 18h5.658c-.412 1.165-1.523 2-2.829 2s-2.417-.835-2.829-2z" />
                            </g>
                          </svg>:

                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="dark:fill-white fill-black"
                          >
                            <g>
                              <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path>
                            </g>
                          </svg>}
                        </div>
                      </Link>
                    </span>

                    <span>
                      <Link href={"/bookmarks"}>
                        <div className="p-4 flex items-center rounded-3xl hover:bg-[hsl(var(--accent))] ">
                          {mainpathname ==="bookmarks" ?
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="dark:fill-white"
                            >
                              <g>
                                <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z" />
                              </g>
                            </svg>
                              :

                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="dark:fill-white"
                          >
                            <g>
                              <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
                            </g>
                          </svg>}
                        </div>
                      </Link>
                    </span>

                    <span>

                      <Link href={`${userObj?.user?.username ? "/"+userObj.user.username :""} `}>
                        <div className="p-4 flex items-center rounded-3xl hover:bg-[hsl(var(--accent))] ">
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="dark:fill-white"
                          >
                            <g>
                              <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                            </g>
                          </svg>
                        </div>
                      </Link>
                    </span>

                    <span>
                      <Link href={"/communites"}>
                        <div className="p-4 flex items-center rounded-3xl hover:bg-[hsl(var(--accent))] ">
                          {
                            mainpathname==='communites' ?
                              <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="dark:fill-white"
                              >
                                <g>
                                  <path d="M7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-1.608 1.732-2.762 4.389-2.869 8.248l-.03 1.083zM9.616 9.27C10.452 8.63 11 7.632 11 6.5 11 4.57 9.433 3 7.5 3S4 4.57 4 6.5c0 1.132.548 2.13 1.384 2.77.589.451 1.317.73 2.116.73s1.527-.279 2.116-.73zm6.884 1.726c-3.264 0-6.816 2.358-7 8.977L9.471 21h14.057l-.029-1.027c-.184-6.618-3.736-8.977-7-8.977zm2.116-1.726C19.452 8.63 20 7.632 20 6.5 20 4.57 18.433 3 16.5 3S13 4.57 13 6.5c0 1.132.548 2.13 1.384 2.77.589.451 1.317.73 2.116.73s1.527-.279 2.116-.73z" />
                                </g>
                              </svg> :
                              <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="dark:fill-white "
                              >
                                <g>
                                  <path d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9c-.799 0-1.527-.279-2.116-.73-.836-.64-1.384-1.638-1.384-2.77 0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z"></path>
                                </g>
                              </svg>

                          }
                         
                        </div>
                      </Link>
                    </span>
                  </div>
                </div>
                <div className="w-full p-3 h-[72px] border-t border-solid border-[hsl(var(--border-color))]">
                  <div className="w-full h-full hover:bg-[hsl(var(--accent))] rounded-8">
                    {userObj?.user ? (
                      userObj.user.profileImage ? (
                        <Image
                          src={userObj.user.profileImage}
                          alt="A sample image"
                          className="h-full w-full object-cover object-center rounded-full"
                          width={100}
                          height={100}
                          priority
                        />
                      ) : (
                        <h1 className="text-white">P</h1>
                      )
                    ) : (
                      <p className="text-white">L</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* main outlet */}
      <div className="relative flex flex-col justify-center un-b w-full min-h-full">
        <div className=" w-full flex flex-col pb-14 min-h-full">
          {/* <div className="h-[60px] w-full"></div> */}
          <AuthProvider>{children}</AuthProvider>
        </div>
      </div>

      {/* buttom nav */}
      <nav className="fixed mobile:hidden bottom-0 w-full h-[55px] border-t border-[hsl(var(--border-color))] border-solid z-10 bg-[hsl(var(--background))] flex flex-1 gap-2 px-2">
        <span className="w-full py-2">
          <Link href={"/home"} className="h-full">
            <div className={`flex items-center justify-center rounded-3xl ${mainpathname ==="home" && "bg-[hsl(var(--accent))] border border-[hsl(var(--border-color))]"} h-full`}>
              {
                mainpathname==="home" ?
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="stroke-black fill-black dark:stroke-white dark:fill-white h-[70%] aspect-square"
                >
                  <g>
                    <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"></path>
                  </g>
                </svg>:
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="dark:fill-white h-[70%] aspect-square"
                >
                  <g>
                    <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z" />
                  </g>
                </svg>
                
              }
            </div>
          </Link>
        </span>
        <span className="w-full py-2">
          <div onClick={()=>setOpenSearch(true)} className="h-full cursor-pointer">
            <div className="flex items-center justify-center rounded-3xl hover:bg-[hsl(var(--accent))] h-full">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="fill-black dark:fill-white h-[70%] aspect-square"
              >
                <g>
                  <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                </g>
              </svg>
            </div>
          </div>
        </span>
        <span className="w-full py-2">
          <Link href={"/communites"} className="h-full">
            <div className={`flex items-center justify-center rounded-3xl ${mainpathname ==="communites" && "bg-[hsl(var(--accent))] border border-[hsl(var(--border-color))]"} h-full`}>
              {
                mainpathname==='communites' ?
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="dark:fill-white h-[70%] aspect-square"
                  >
                    <g>
                      <path d="M7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-1.608 1.732-2.762 4.389-2.869 8.248l-.03 1.083zM9.616 9.27C10.452 8.63 11 7.632 11 6.5 11 4.57 9.433 3 7.5 3S4 4.57 4 6.5c0 1.132.548 2.13 1.384 2.77.589.451 1.317.73 2.116.73s1.527-.279 2.116-.73zm6.884 1.726c-3.264 0-6.816 2.358-7 8.977L9.471 21h14.057l-.029-1.027c-.184-6.618-3.736-8.977-7-8.977zm2.116-1.726C19.452 8.63 20 7.632 20 6.5 20 4.57 18.433 3 16.5 3S13 4.57 13 6.5c0 1.132.548 2.13 1.384 2.77.589.451 1.317.73 2.116.73s1.527-.279 2.116-.73z" />
                    </g>
                  </svg> :
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="dark:fill-white h-[70%] aspect-square "
                  >
                    <g>
                      <path d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9c-.799 0-1.527-.279-2.116-.73-.836-.64-1.384-1.638-1.384-2.77 0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z"></path>
                    </g>
                  </svg>

              }
            </div>
          </Link>
        </span>

        <span className="w-full py-2">
          <Link href={"bookmarks"} className="h-full">
            <div className={`flex items-center justify-center rounded-3xl ${mainpathname ==="bookmarks" && "bg-[hsl(var(--accent))] border border-[hsl(var(--border-color))]"} h-full`}>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="dark:fill-white h-[70%] aspect-square"
              >
                <g>
                  <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
                </g>
              </svg>
            </div>
          </Link>
        </span>

        <span className="w-full py-2">
          <Link href={`${userObj?.user?.username ? "/"+userObj.user.username :""} `} className="h-full">
            <div className={`flex items-center justify-center rounded-3xl ${mainpathname ==="Xlemson" && "bg-[hsl(var(--accent))] border border-[hsl(var(--border-color))]"} h-full`}>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="dark:fill-white h-[70%] aspect-square"
              >
                <g>
                  <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z "></path>
                </g>
              </svg>
            </div>
          </Link>
        </span>
      </nav>
      <CommandPalette />
    </div>
  );
};

export default HomeLayout;
