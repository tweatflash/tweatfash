"use client";
// components/CreatePostDialog.tsx
import createPost from "../../../../lib/createPost"
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState, useContext } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import Person from "@/app/components/person";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { AuthContext } from "@/app/context/Authcontext";
import Example from "../list";
import BlobImages from "../blobImages";
type Prop = {
  post: boolean;
  setPost: React.Dispatch<React.SetStateAction<boolean>>;
};

type File = {
  lastModified: number;
  lastModifiedDate: any;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};
export default function CreatePostDialog() {
  const editableRef = useRef<HTMLDivElement>(null);
  const [text,setText]=useState("")
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [padding, setPadding] = useState<number>(0);
  const [loading,setLoading]=useState(false)
  const [people, setPeople] = useState([
    {
      id: 1,
      name: "Everyone",
      avatar: "/public.png",
    },
  ]);
  const { userObj ,post,setPost}: any = useContext(AuthContext);
  const [selected, setSelected] = useState(people[0]);
  const [mediaList, setMediaList] = useState<{ type: string; url: string ,file:any}[]>([]);
  const formData = new FormData();
  const added = new Set();

  const handleFileChange = (event: any) => {
    const newFiles = Array.from(event.target.files || []);
    const newMedia2 = newFiles.map((file:any) => {
      return file;
    })
    const newMedia = newFiles.map((file:any) => {
      const type = file.type.startsWith('image') ? 'image' : 
                   file.type.startsWith('video') ? 'video' : '';
      if (!type) return null;

      const url = URL.createObjectURL(file);
      return { type, url ,file};
    }).filter(Boolean) as { type: string; url: string,file:string }[];
    setMediaList(prev => [...prev, ...newMedia]);
    setSelectedFiles((prev:any)=> [...prev, ...newMedia2]);
    event.target.value = "";
    

  };
  // 1) On open, focus the editable
  useEffect(() => {
    if (post) {
      setTimeout(() => editableRef.current?.focus(), 100);
    }
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
    setText(editableRef?.current ?editableRef.current.innerText :"")
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
  
  const fetchComm = () => {
    if (userObj?.communities) {
      const data = userObj?.communities.map((item: any) => ({
        name: item.name,
        id: item._id,
        avatar: item.profileImage,
      }));
      setPeople([...people, ...data]);
    }
  };
  const uploadPostToFormData=async ()=>{
      if (text.trim().length){
          formData.delete('text'); // remove if exists
          formData.append("text",text) 
      }else{
        formData.delete('text'); // remove if exists
      }
      
      if (mediaList.length){
          selectedFiles.forEach((file:any) => {
            if (!added.has(file.name)) {
              formData.append(file.type.startsWith('image') ?'image':"video", file);
              added.add(file.name);
            }
          });

      }else{
        formData.delete("image")
        formData.delete("video")
      }
      if(text.trim().length || selectedFiles.length){
        const request:any= await createPost("/posts/create",formData)
        const response:any=await request
        console.log(response)
      }
      
      
  }
  return (
    <Transition show={post} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-start justify-center "
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
          <Dialog.Panel className="mx-auto mt-0 mobile:py-10 h-full mobile:bg-transparent bg-[hsl(var(--background))] w-full mobile:max-w-[600px] max-w-full mobile:px-4 min-h-full mobile:min-h-fit z-10 ">
           
            <Dialog.Panel className="mobile:rounded-2xl overflow-x-hidden relative max-h-full flex flex-col gap-4 pb-4 mobile:bg-[hsl(var(--background))]">
               
              <Dialog.Title className="text-lg sticky top-0">
                
                <div className="border-b sm:border-none relative border-zinc-200 dark:border-zinc-700 h-[55px] flex flex-row justify-between  gap-1">
                   
                  <div className="aspect-square h-[55px] p-2">
                    <button
                      className="h-full aspect-square hover:bg-[hsl(var(--accent))] rounded-full flex justify-center items-center"
                      onClick={() => setPost(false)}
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
                    <p className="text-[--color] font-bold text-lg">
                      Create a Tweat
                    </p>
                    <div className="flex flex-row gap-3"> 
                      <button className="px-4 rounded-full bg-[hsl(var(--accent))] text-[#727272] text-[15px] py-[1px]">
                        drafts
                      </button>
                      <button disabled={selectedFiles.length || text.trim().length ? false:true} className="mobile:hidden inline-flex items-center gap-2 px-3 py-2 outline-none rounded-full bg-[#4070f4] disabled:bg-slate-700 text-white text-sm" onClick={uploadPostToFormData}> 
                        {/* <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg> */}
                        <svg
                          role="img"
                          className="size-4"
                          viewBox="0 0 20 20" 
                          fill="none" 
                          stroke="currentColor"
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          xmlns="http://www.w3.org/2000/svg">
                            <g>
                              <title></title>
                              <path d="M10.2171 2.2793L10.2171 12.9745M10.2171 2.2793L13.333 4.99984M10.2171 2.2793L7.08301 4.99984M2.49967 10.9925L2.49967 14.1592C2.49967 16.011 4.00084 17.5121 5.85261 17.5121L14.9801 17.5121C16.8318 17.5121 18.333 16.011 18.333 14.1592L18.333 10.9925"></path>
                          </g>
                        </svg>
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Title>


              <div className=" w-full max-h-full overflow-y-scroll no-scrollbar">
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
                      <div className="w-[calc(100%-50px)] relative min-h-[100px] h-auto flex-1 flex flex-col gap-3">
                        <div className="relative flex flex-col gap-3 w-full h-auto">
                          <Listbox value={selected} onChange={setSelected}>
                            {/* <Label className="block text-sm/6 font-medium text-gray-900">Assigned to</Label> */}
                            <div className="relative">
                              <ListboxButton className="flex outline-none justify-between gap-5 w-auto cursor-default rounded-lg bg-[hsl(var(--accent))]  text-left sm:text-sm px-2 h-[34px] text-[#727272] border border-[hsl(var(--border-color))]">
                                <span className="col-start-1 row-start-1 flex items-center gap-3 ">
                                  {/* <img alt="" src={selected.avatar} className="size-5 shrink-0 rounded-full" /> */}
                                  <span className="block truncate ">
                                    {selected.name}
                                  </span>
                                </span>
                                <span className="  flex items-center ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                  </svg>
                                </span>
                              </ListboxButton>

                              <ListboxOptions
                                transition
                                className="absolute z-10 mt-1 py-3 w-auto overflow-auto rounded-md bg-[hsl(var(--background))] text-base shadow-lg ring-1 ring-[hsl(var(--border-color))] focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                              >
                                <div className="px-5">
                                  <h2 className="text-[--color] text-lg">
                                    Choose your Audience
                                  </h2>
                                </div>
                                {people.map((person) => (
                                  <ListboxOption
                                    key={person.id}
                                    value={person}
                                    className={`group hover:bg-[hsl(var(--accent))] select-none flex gap-4 justify-between relative cursor-default py-3  px-4 text-[--color] `}
                                  >
                                    <div className="flex items-center gap-3">
                                      {person.id === 1 ? (
                                        <></>
                                      ) : (
                                        <img
                                          alt=""
                                          src={person.avatar}
                                          className="size-10 shrink-0 rounded-lg"
                                        />
                                      )}

                                      <div className="flex flex-col truncate font-normal group-data-selected:font-semibold">
                                        <span className="truncate">
                                          {person.name}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                          {person.id === 1
                                            ? "Public"
                                            : "Community"}
                                        </span>
                                      </div>
                                    </div>

                                    <span
                                      className={`${
                                        selected.id === person.id
                                          ? ""
                                          : "invisible"
                                      } flex items-center text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white`}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-5"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="m4.5 12.75 6 6 9-13.5"
                                        />
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
                                      w-full text-[--color] overflow-auto
                                      whitespace-pre-wrap break-words
                                      bg-transparent outline-none
                                    `}
                              onInput={onInput}
                              onKeyDown={onKeyDown}
                            />
                          </div>
                          <BlobImages setSelectedFiles={setSelectedFiles} mediaList={mediaList} setMediaList={setMediaList}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="w-full sticky bottom-0">
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
                <div className="flex justify-between px-2 w-full pt-4">
                  <div className="h-9 flex text-[#727272] ">
                    
                    <label
                      htmlFor="file"
                      className="p-2 rounded-full text-[#727272] hover:text-[--color] hover:bg-[hsl(var(--accent))] transition-all"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="size-5"
                        fill="currentColor"
                      >
                        <g>
                          <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z" />
                        </g>
                      </svg>

                      <input
                        id="file"
                        onChange={handleFileChange}
                        type="file"
                        className=" sr-only"
                        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,"
                        multiple
                      />
                    </label>
                    
                  </div>
                  <div className="pr-2">
                    <button disabled={selectedFiles.length || text.trim().length ? false:true} className="mobile:inline-flex hidden  items-center gap-2 px-3 py-2 outline-none rounded-full bg-[#4070f4] disabled:bg-slate-700 text-white text-sm" onClick={uploadPostToFormData}> 
                        {/* <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg> */}
                        <svg
                          role="img"
                          className="size-4"
                          viewBox="0 0 20 20" 
                          fill="none" 
                          stroke="currentColor"
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          xmlns="http://www.w3.org/2000/svg">
                            <g>
                              <title></title>
                              <path d="M10.2171 2.2793L10.2171 12.9745M10.2171 2.2793L13.333 4.99984M10.2171 2.2793L7.08301 4.99984M2.49967 10.9925L2.49967 14.1592C2.49967 16.011 4.00084 17.5121 5.85261 17.5121L14.9801 17.5121C16.8318 17.5121 18.333 16.011 18.333 14.1592L18.333 10.9925"></path>
                          </g>
                        </svg>
                        Upload
                      </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
