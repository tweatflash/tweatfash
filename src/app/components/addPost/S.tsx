"use client";
// components/CreatePostDialog.tsx
import createPost from "../../../../lib/createPost";
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
import CommentForm from "../comment/CommentForm";
type Prop = {
  post: boolean;
  setPost: React.Dispatch<React.SetStateAction<boolean>>;
};
interface CreatePost {
  isOpen: boolean;
  onClose: () => void;
  post: HomeFeed;
}
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
  const [text, setText] = useState("");
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [padding, setPadding] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([
    {
      id: 1,
      name: "Everyone can reply",
      avatar: "/public.png",
    },
  ]);
  const { userObj, post, setPost,setCommentRoute }: any = useContext(AuthContext);
  const [selected, setSelected] = useState(people[0]);
  const [mediaList, setMediaList] = useState<
    { type: string; url: string; file: any }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
  const formData = new FormData();
  const added = new Set();
  useEffect(()=>{
    setCommentRoute("/posts/create")
  },[post])
  const handleFileChange = (event: any) => {
    const newFiles = Array.from(event.target.files || []);
    const newMedia2 = newFiles.map((file: any) => {
      return file;
    });
    const newMedia = newFiles
      .map((file: any) => {
        const type = file.type.startsWith("image")
          ? "image"
          : file.type.startsWith("video")
          ? "video"
          : "";
        if (!type) return null;

        const url = URL.createObjectURL(file);
        return { type, url, file };
      })
      .filter(Boolean) as { type: string; url: string; file: string }[];
    setMediaList((prev) => [...prev, ...newMedia]);
    setSelectedFiles((prev: any) => [...prev, ...newMedia2]);
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
    setText(editableRef?.current ? editableRef.current.innerText : "");
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
  const uploadPostToFormData = async () => {
    if (text.trim().length) {
      formData.delete("text"); // remove if exists
      formData.append("text", text);
    } else {
      formData.delete("text"); // remove if exists
    }

    if (mediaList.length) {
      selectedFiles.forEach((file: any) => {
        if (!added.has(file.name)) {
          formData.append(
            file.type.startsWith("image") ? "image" : "video",
            file
          );
          added.add(file.name);
        }
      });
    } else {
      formData.delete("image");
      formData.delete("video");
    }
    if (text.trim().length || selectedFiles.length) {
      const request: any = await createPost("/posts/create", formData);
      const response: any = await request;
      console.log(response);
    }
  };
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
              <div className="text-lg flex flex-col sticky top-0 border-b border-[hsl(var(--border-color))]">
                <div className=" h-[55px] flex flex-row justify-between  gap-1">
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
                    <p className="text-[--color] text-lg">Compose</p>
                    <div className="flex flex-row gap-3">
                      <button
                     
                        className="px-4 py-2 text-sm font-medium text-[--color] bg-white/5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                      Save Draft
                    </button>
                    </div>
                  </div>
                </div>
                {isUploading && (
                <div className="px-3 w-full sm:px-4 pb-2">
                  <div className="bg-[hsl(var(--accent))] rounded-full h-1 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center gap-2 mt-1">
                    <span className="text-xs text-[#727272]">
                      {uploadProgress < 100 ? 'Uploading post...' : 'Processing...'}
                    </span>
                    <span className="text-xs text-[#727272]">{uploadProgress}%</span>
                  </div>
                </div>
              )}
              </div>

              <div className=" w-full max-h-full overflow-y-scroll no-scrollbar">
                <div className="flex flex-col relative border-b border-solid border-[hsl(var(--border-color))] last:border-none last:border-b-0">
                  <div className="flex flex-col w-full">
                    <div className="gap-3 flex item-start w-full px-4 ">
                      
                      <div className="relative h-auto flex-1 flex flex-col gap-3">
                        <CommentForm
                          placeholder="Aything for the world 😎 ..."
                          buttonText="Post"
                          setIsUploading={setIsUploading}
                          setUploadProgress={setUploadProgress}
                          isUploading={isUploading}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full sticky bottom-0">
                <div className="w-full  flex px-4">
                  <div className="css-175oi2r r-xoduu5 r-eqz5dr">
                    <div className="css-175oi2r r-xoduu5 r-18u37iz r-kzbkwu">
                      <div className="pb-4 flex flex-col gap-2">
                        
                          <div
                            dir="ltr"
                            className="flex gap-2 items-center text-[#727272] text-sm"
                          >
                            <Listbox value={selected} onChange={setSelected}>
                            {/* <Label className="block text-sm/6 font-medium text-gray-900">Assigned to</Label> */}
                            <div className="relative">
                              <ListboxButton className="flex outline-none items-center justify-between gap-5 w-fit cursor-default rounded-lg bg-[hsl(var(--accent))]  text-left sm:text-sm px-2 h-[34px] text-[#727272] ">
                                <span className="col-start-1 row-start-1 flex items-center gap-3 ">
                                  {/* <img alt="" src={selected.avatar} className="size-5 shrink-0 rounded-full" /> */}
                                  <span className="block truncate text-sm">
                                    {selected.name}
                                  </span>
                                </span>
                                <span className="size-4 flex items-center ">
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
                                className=" z-[2000] mt-1 py-3 w-fit overflow-auto rounded-md bg-[hsl(var(--background))] text-base shadow-lg ring-1 ring-[hsl(var(--border-color))] focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
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
                          </div>
                      </div>
                    </div>
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
