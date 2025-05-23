"use client"
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import Loading from "../loadingd";
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
const LayoutB = ({ children }: { children: React.ReactNode }) => {
  const {userObj,authLoader}:any=useContext(AuthContext)
  const [open, setOpen] = useState(true)

  useEffect(()=>{
    authLoader ? console.log("Loading") :console.log(userObj)
  },[authLoader])
  return(
    authLoader?<Loading/> :(!authLoader && userObj ?<div className="main-handler grid absolute t-0 l-0 r-0 b-0 w-full ">
        <div className="flex flex-col border-dashed sticky top-0 left-0 w-full h-full border-[hsl(var(--border-color))] un-b"></div>
        <div className="flex flex-col w-full h-full border-b sticky  border-dashed border-[hsl(var(--border-color))] top-0 z-20 bg-[hsl(var(--background)/.6)] backdrop-blur-md">
        <div className="fixed top-0 w-full px-4">
          <div className="container-wrapper">
            <div className="w-full flex h-14 items-center gap-2 md:gap-4">
              <div className="mr-4 hidden md:flex">
                <a className="mr-4 flex items-center gap-2 lg:mr-6" href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    className="h-6 w-6"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <line
                      x1="208"
                      y1="128"
                      x2="128"
                      y2="208"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                    ></line>
                    <line
                      x1="192"
                      y1="40"
                      x2="40"
                      y2="192"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                    ></line>
                  </svg>
                  <span className="hidden font-bold lg:inline-block text-black dark:text-white">
                    tweatflash
                  </span>
                </a>
                <nav className="flex items-center gap-4 text-sm xl:gap-6">
                  <a
                    className="transition-colors text-white"
                    href="/docs/installation"
                  >
                    {authLoader ? "Loading" :"Loding completed"}
                  </a>
                  <a
                    className="transition-colors text-white"
                    href="/docs/components"
                  >
                    Components
                  </a>
                  <a className="transition-colors text-white" href="/blocks">
                    Blocks
                  </a>
                  <a className="transition-colors text-white" href="/charts">
                    Charts
                  </a>
                  <a className="transition-colors text-white" href="/themes">
                    Themes
                  </a>
                  <a className="transition-colors text-white" href="/colors">
                    Colors
                  </a>
                </nav>
              </div>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground py-2 h-8 w-full gap-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-:R15u6ja:"
                data-state="closed"
              >
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
                <span className="sr-only">Toggle Menu</span>
                <span className="flex h-8 flex-1 items-center justify-between rounded-md border bg-muted/50 px-2 text-sm font-normal text-muted-foreground shadow-none">
                  Search documentation...
                </span>
              </button>
              <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
                <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
                  <button className="inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64">
                    <span className="hidden lg:inline-flex text-current">
                      Search tweatflash...
                    </span>
                    <span className="inline-flex lg:hidden">Search...</span>
                    <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </button>
                </div>
                <nav className="flex items-center gap-0.5">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 px-0"
                    href="https://github.com/shadcn-ui/ui"
                  >
                    <svg viewBox="0 0 438.549 438.549" className="h-4 w-4">
                      <path
                        fill="currentColor"
                        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                      ></path>
                    </svg>
                    <span className="sr-only">GitHub</span>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* side nav */}
        <div className="flex flex-col un-b">
          <div className="hidden fixed w-[72px] mobile:flex flex-col h-[calc(100vh-50px)] left-0 top-[50px] border-r border-dashed border-[hsl(var(--border-color))]">
            <nav className="w-full h-full ">
              <div className=" h-full flex items-center">
                <div className="w-full h-full">
                  <div className="w-full h-[calc(100%-72px)] no-scrollbar overflow-auto flex items-center" >
                      <div className="p-2 w-full grid gap-1">
                          <span className="w-full">
                              <Link href={"/home"} className="">
                                  <div className="p-4 flex items-center rounded-3xl hover:bg-[hsl(var(--accent))] ">
                                      <svg viewBox="0 0 24 24" aria-hidden="true" className="stroke-black fill-black dark:stroke-white dark:fill-white"><g><path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"></path></g></svg>
                                  
                                  </div>
                              </Link>
                          </span>
                          <span>
                              <Link href={"/explore"}>
                                  <div className="p-4 flex items-center rounded-3xl hover:bg-[hsl(var(--accent))]">
                                      <svg viewBox="0 0 24 24" aria-hidden="true" className="fill-black dark:fill-white" ><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>
                                  
                                  </div>
                              </Link>
                          </span>
                          <span>
                              <Link href={"/notifications"}>
                                  <div className="p-4 flex items-center rounded-3xl hover:bg-[hsl(var(--accent))]">
                                  <svg viewBox="0 0 24 24" aria-hidden="true" className="dark:fill-white fill-black"><g><path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path></g></svg>
                                  
                                  </div>
                              </Link>
                          </span>
                          
                          <span>
                              <Link href={"/bookmarks"}>
                                  <div className="p-4 flex items-center rounded-3xl hover:bg-[hsl(var(--accent))] ">
                                      <svg viewBox="0 0 24 24" aria-hidden="true" className="dark:fill-white" ><g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g></svg>
                                  
                                  </div>
                              </Link>
                          </span>
                          
                          <span>
                              <Link href={"/profile"}>
                                  <div className="p-4 flex items-center rounded-3xl hover:bg-[hsl(var(--accent))] ">
                                  <svg viewBox="0 0 24 24" aria-hidden="true" className="dark:fill-white"><g><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path></g></svg>
                                  
                                  </div>
                              </Link>
                          </span>
                          
                          <span>
                              <Link href={"/communites"}>
                                  <div className="p-4 flex items-center rounded-3xl hover:bg-[hsl(var(--accent))] ">
                                      <svg viewBox="0 0 24 24" aria-hidden="true" className="dark:fill-white"><g><path d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9c-.799 0-1.527-.279-2.116-.73-.836-.64-1.384-1.638-1.384-2.77 0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z"></path></g></svg>
                                  
                                  </div>
                              </Link>
                          </span>
                      
                      </div>
                  </div>
                  <div className="w-full p-3 h-[72px] border-t border-dashed border-[hsl(var(--border-color))]">
                      <div className="w-full h-full hover:bg-[hsl(var(--accent))] rounded-8">
                        {
                          userObj.user ?(userObj.user.profileImage ?<Image
                            src={userObj.user.profileImage}
                            alt="A sample image"
                            className="h-full w-full object-cover object-center rounded-full"
                            width={100}
                            height={100}
                            priority
                          /> :<h1 className="text-white">P</h1>):<p className="text-white">L</p>
                        }
                      </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* main outlet */}
        <div className="relative flex flex-col justify-center un-b w-full">
          <div className=" w-full flex flex-col pb-14 ">
            {/* <div className="h-[60px] w-full"></div> */}
            {children}
          </div>
        </div>

        {/* buttom nav */}
        <div className="fixed mobile:hidden bottom-0 w-full h-[55px] border-t border-[hsl(var(--border-color))] border-dashed z-10 bg-[hsl(var(--background))] flex flex-1 gap-2">
              <span className="w-full py-2">
                  <Link href={"/home"} className="h-full">
                      <div className="flex items-center justify-center rounded-3xl hover:bg-[hsl(var(--accent))] h-full">
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="stroke-black fill-black dark:stroke-white dark:fill-white h-[70%] aspect-square"><g><path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"></path></g></svg>
                      
                      </div>
                  </Link>
              </span>
              <span className="w-full py-2">
                  <Link href={"/explore"} className="h-full">
                      <div className="flex items-center justify-center rounded-3xl hover:bg-[hsl(var(--accent))] h-full">
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="fill-black dark:fill-white h-[70%] aspect-square" ><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>
                      
                      </div>
                  </Link>
              </span>
              <span className="w-full py-2">
                  <Link href={"/notifications"} className="h-full">
                      <div className="flex items-center justify-center rounded-3xl hover:bg-[hsl(var(--accent))] h-full">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="dark:fill-white h-[70%] aspect-square fill-black"><g><path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path></g></svg>
                      
                      </div>
                  </Link>
              </span>
              
              <span className="w-full py-2">
                  <Link href={"bookmarks"} className="h-full">
                      <div className=" flex items-center justify-center rounded-3xl hover:bg-[hsl(var(--accent))] h-full">
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="dark:fill-white h-[70%] aspect-square" ><g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g></svg>
                      
                      </div>
                  </Link>
              </span>
              
              <span className="w-full py-2">
                  <Link href={"profile"} className="h-full">
                      <div className=" flex items-center justify-center rounded-3xl hover:bg-[hsl(var(--accent))] h-full">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="dark:fill-white h-[70%] aspect-square"><g><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z "></path></g></svg>
                      
                      </div>
                  </Link>
              </span>
              
              
        </div>
    </div>: <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  
  <div className="fixed bg-gray-900/5 inset-0 transition-opacity" aria-hidden="true"></div>

  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
              <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-base font-semibold text-gray-900" id="modal-title">Unexpected Error</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">An unexpected error occoured this might be form you internet connection kindly hit the refresh  button to see if the page will be restored</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={()=>window.location.reload()}>Refresh</button>
          <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
    )
  
  )
}
  
export default LayoutB;
  