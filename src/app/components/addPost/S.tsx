"use client";
// components/CreatePostDialog.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import Person from "@/app/components/person";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
type Prop={
  post:boolean,
  setPost:React.Dispatch<React.SetStateAction<boolean>>
}
const people = [
  {
    id: 1,
    name: 'Everyone',
    avatar:
      '/public.png',
  },
  {
    id: 2,
    name: 'Tailwind CSS',
    avatar:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Next.js',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'React',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
]
type File={
  lastModified :number
  lastModifiedDate: any
  name: string
  size:number
  type: string
  webkitRelativePath:string
}
export default function CreatePostDialog({post,setPost}:Prop) {
  const editableRef = useRef<HTMLDivElement>(null);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  useEffect(()=>{
    console.log("selectedFiles",selectedFiles)
  },[selectedFiles])
  const [selected, setSelected] = useState(people[0])
  const handleFileChange = (event:any) => {
    event.preventDefault();
    setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
    
  }; 
  // 1) On open, focus the editable
  useEffect(() => {
    if (post) {
      setTimeout(() => editableRef.current?.focus(), 100);
    }
    console.log(post)
  }, [post]);

  useEffect(() => {
    const toggle = (e: KeyboardEvent) => {
      const hotKey = (e.metaKey || e.ctrlKey) && e.key === "c";
      if (hotKey) {
        e.preventDefault();
        setPost(true);
      }
      if (e.key === "Escape") setPost(false);
    };
    window.addEventListener("keydown", toggle);
    return () => window.removeEventListener("keydown", toggle);
  }, []);
  useEffect(() => {
    // for browsers that support it
    document.execCommand("defaultParagraphSeparator", false, "br");
  }, []);

  // 3) Show/hide placeholder
  const onInput = () => {
    const txt = editableRef.current?.innerText || "";
    setPlaceholderVisible(txt.trim().length === 0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // insert two <br> so you get a blank line
      document.execCommand("insertHTML", false, "<br><br>");
      onInput();
    }
  };
  
  return (
    <Transition show={post} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-start justify-center mobile:pt-10"
        initialFocus={editableRef}
        onClose={() => setPost(false)}
      >
        {/* <Dialog.Overlay className="fixed inset-0 bg-black/60" /> */}
        <div className="absolute inset-0 bg-[rgba(91,112,131,.4)] w-full h-full" />
        <Transition.Child
          as={Fragment}
          enter="transition duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="mx-auto mt-0 mobile:bg-transparent bg-[hsl(var(--background))] w-full mobile:max-w-[600px] max-w-full mobile:px-4 min-h-full mobile:min-h-fit z-10 ">
            <Dialog.Panel className="mobile:rounded-2xl flex flex-col gap-4 pb-4 mobile:bg-[hsl(var(--background))]">
              <Dialog.Title className="text-lg">
                <div className="border-b sm:border-none relative border-zinc-200 dark:border-zinc-700 h-[55px] flex flex-row justify-between  gap-1">
                  <div className="aspect-square h-[55px] p-2">
                    <button
                      className="h-full aspect-square hover:bg-[hsl(var(--accent))] rounded-full flex justify-center items-center"
                      onClick={()=>setPost(false)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="fill-black dark:fill-white size-5"
                        style={{ color: "rgb(239, 243, 244)" }}
                      >
                        <g>
                          <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" />
                        </g>
                      </svg>
                    </button>
                  </div>
                  <div className="h-full flex flex-1 justify-between items-center pr-4">
                    <p className="text-[--color] text-lg">
                      Create Post
                    </p>
                    <button className="px-4 rounded-2xl bg-[hsl(var(--accent))] text-[#727272] text-[15px] py-[1px]">
                      drafts
                    </button>
                  </div>
                </div>
              </Dialog.Title>
              <div className=" w-full">
                <div className="flex flex-col relative border-b border-solid border-[hsl(var(--border-color))] last:border-none last:border-b-0">
                  <div className="flex flex-col w-full">
                    <div className="gap-3 flex item-start w-full px-4 ">
                      <div className="">
                        <div className="w-9 h-9 rounded-[50%] border border-[hsl(var(--border-color))] bg-[hsl(var(--accent))]">
                          <img
                            alt=""
                            src="https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png"
                            className="h-full w-full object-cover object-center rounded-full"
                          />
                        </div>
                      </div>
                      <div className="w-[calc(100%-50px)] flex-1 h-auto flex flex-col gap-3">
                        <Listbox value={selected} onChange={setSelected}>
                          {/* <Label className="block text-sm/6 font-medium text-gray-900">Assigned to</Label> */}
                          <div className="relative">
                            <ListboxButton className="flex justify-between gap-5 w-auto cursor-default rounded-lg bg-[hsl(var(--accent))]  text-left sm:text-sm px-2 h-[34px] text-[#727272] border border-[hsl(var(--border-color))]">
                              <span className="col-start-1 row-start-1 flex items-center gap-3 ">
                                {/* <img alt="" src={selected.avatar} className="size-5 shrink-0 rounded-full" /> */}
                                <span className="block truncate ">{selected.name}</span>
                              </span>
                              <span className="  flex items-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                              </span>


                            </ListboxButton>

                            <ListboxOptions
                              transition
                              className="absolute z-10 mt-1 py-3 w-auto overflow-auto rounded-md bg-[hsl(var(--background))] text-base shadow-lg ring-1 ring-[hsl(var(--border-color))] focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                            >
                              <div className="px-5">
                                <h2 className="text-[--color] text-lg">Choose your Audience</h2>
                              </div>
                              {people.map((person) => (
                                <ListboxOption
                                  key={person.id}
                                  value={person}
                                  className={`group hover:bg-[hsl(var(--accent))] select-none flex gap-4 justify-between relative cursor-default py-3  px-4 text-[--color] `}
                                >
                                  <div className="flex items-center gap-3">
                                    {
                                      person.id===1 ?<></>:<img alt="" src={person.avatar} className="size-10 shrink-0 rounded-lg" />
                                    }
                                    
                                    <div className="flex flex-col truncate font-normal group-data-selected:font-semibold">
                                      <span className="truncate">{person.name}</span>
                                      <span className="text-sm text-gray-500 dark:text-gray-400">{person.id === 1 ? "Public" : "Community"}</span>
                                    </div>
                                  </div>

                                  <span className={`${selected.id === person.id ? "" : "invisible"} flex items-center text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>

                                  </span>
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </div>
                        </Listbox>
                        <div className="relative">
                          {placeholderVisible && (
                            <span className="pointer-events-none absolute text-gray-400 dark:text-gray-500">
                              What’s happening?
                            </span>
                          )}
                          <div
                            ref={editableRef}
                            contentEditable
                            suppressContentEditableWarning
                            role="textbox"
                            aria-multiline="true"
                            tabIndex={0}
                            className={`
                                      w-full text-[--color] min-h-[6rem] max-h-[20rem] overflow-auto
                                      whitespace-pre-wrap break-words
                                      bg-transparent outline-none
                                    `}
                            onInput={onInput}
                            onKeyDown={onKeyDown}
                          />
                        </div>
                        <>
                            {selectedFiles.length ?<div className='w-full overflow-x-scroll no-scrollbar'>
                                <div className='w-full h-full'>
                                    <div className='w-full h-full relative'>
                                        {/* {selectedFiles.map((file:File)=>(
                                            <div className='h-full relative w-auto rounded-lg overflow-hidden border border-[hsl(var(--border-color))]'>
                                                <div className='absolute w-full h-14 px-3 flex justify-end gap-3 z-[2] pt-5'>
                                                    <div className='pvi-ho' onClick={()=>setSelectedFiles(selectedFiles.filter(it2=>it2!==file))}>
                                                        <svg width="25px" height="25px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel</title> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd"> <g id="work-case" fill="#ffffff" transform="translate(91.520000, 91.520000)"> <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"> </polygon> </g> </g> </g></svg>
                                                    </div>
                                                    
                                                </div>
                                                {file.type.startsWith('image/') ? <img src={URL.createObjectURL(file)} className="h-full"/> :<video controls  src={URL.createObjectURL(file)} ></video>}
                                            </div>
                                        ))} */}
                                        <div className={`${selectedFiles.length >1 ? "pb-[57%]" : "pb-[100%]"}  w-full`}></div>
                                        <div className='h-full absolute w-full top-0 rounded-lg'>
                                          <div className='flex-1  gap-3 h-full relative shrink grow flex scroll-px-9 scroll-py-0 snap-x overflow-x-auto overflow-y-hidden no-scrollbar  flex-row snap-mandatory flex-nowrap'>
                                            {
                                              selectedFiles.map((file:File,index:number)=>(
                                                <div className={`snap-start stretch ${selectedFiles.length===1 ? "w-full" :"w-[50%]"} h-full bg-[hsl(var(--accent))] border-[hsl(var(--border-color))] shrink-0 border rounded-lg`} onClick={()=>setSelectedFiles(selectedFiles.filter((it2:any)=>it2!==file))}></div>
                                              ))
                                            }
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </div> :<></>}
                        </>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div className="w-full border-b border-solid border-[hsl(var(--border-color))] flex px-4">
                <div className="css-175oi2r r-xoduu5 r-eqz5dr">
                  <div className="css-175oi2r r-xoduu5 r-18u37iz r-kzbkwu">
                    <div className="pb-4 flex flex-col gap-2">
                      <button
                        aria-label="Everyone can reply"
                        role="button"
                        className="flex bg-[hsl(var(--accent))] px-2 py-1 rounded-xl"
                        type="button"
                      >
                        <div
                          dir="ltr"
                          className="flex gap-2 items-center text-[#727272] text-sm"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="size-5 fill-[--color]"
                          >
                            <g>
                              <path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 5.03 7.59c1.42-2.24 3.89-3.75 6.72-3.84L11 6l-2 .5L8.5 9l5 1.5-1.75 1.73zM17 14v-3l-1.5-3 2.88-1.23c1.17 1.42 1.87 3.24 1.87 5.23 0 1.3-.3 2.52-.83 3.61L17 14z"></path>
                            </g>
                          </svg>
                          <span className="css-1jxf684 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3 r-1b43r93 r-1cwl3u0">
                            <span className="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3">
                              Everyone can reply
                            </span>
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              
              </div>
              <div className="flex justify-between px-4 w-full">
                  <div className="h-9 flex text-[#727272] ">
                    <button className="p-2 rounded-full hover:bg-[hsl(var(--accent))] transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                      </svg>


                    </button>
                    
                    <label htmlFor="file" className="p-2 rounded-full hover:bg-[hsl(var(--accent))] transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                        <circle cx={9} cy={9} r={2} />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                      <input id='file' onChange={handleFileChange} type='file' className='file-selector sr-only' accept='image/jpeg,image/png,image/webp,image/gif,video/mp4,' multiple/>
                    </label>
                    <button className="p-2 rounded-full hover:bg-[hsl(var(--accent))] transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>


                    </button>
                    <button className="p-2 rounded-full hover:bg-[hsl(var(--accent))] transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                        <rect x={2} y={6} width={14} height={12} rx={2} />
                      </svg>

                    </button>
                  </div>
                  <div className="h-9 w-[200px] bg-[hsl(var(--accent))]"></div>
              </div>
            </Dialog.Panel>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
