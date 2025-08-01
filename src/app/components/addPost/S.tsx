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
import { X, Image, Smile, ChevronDown, Users, Globe, Check, Sparkles, Heart, Zap } from 'lucide-react';
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
interface Community {
  id: string;
  name: string;
  color: string;
  memberCount: number;
  isActive?: boolean;
}
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
 
  const [postContent, setPostContent] = useState('');
    const [selectedOption, setSelectedOption] = useState<string>('everyone');
    const [replyPermission, setReplyPermission] = useState('everyone');
    const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);
    const [showReplyDropdown, setShowReplyDropdown] = useState(false);
    const [communities,setCommunities]=useState<Community[] | []>([...userObj.communities.map((item:any,index:number)=>{
        return {
          id: item._id,
          name: item.name,
          icon: Users,
          color: 'from-blue-500 to-cyan-500',
          description: item.bio,
          memberCount: item.followers.length,
          isSpecial: true
      }
})])
      const [h,setH]=useState(true)
    // Create audience options with Everyone first, then communities
    const audienceOptions = [
      {
        id: 'everyone',
        name: 'Everyone',
        icon: Globe,
        color: 'from-blue-500 to-cyan-500',
        description: 'Anyone on the platform can see this post',
        memberCount: 0,
        isSpecial: true
      },
      ...communities.map(community => ({
        ...community,
        icon: Users,
        description: `${community.memberCount} members`,
        isSpecial: false
      }))
    ];
  
    const handleOptionSelect = (optionId: string) => {
      setSelectedOption(optionId);
      setShowAudienceDropdown(false);
    };
  
    const getAudienceText = () => {
      if (selectedOption === 'everyone') {
        return 'Everyone';
      }
      const selectedCommunity = communities.find((c:Community )=> c.id === selectedOption);
      return selectedCommunity ? selectedCommunity.name : 'Select audience';
    };
  
    const getAudienceIcon = () => {
      return selectedOption === 'everyone' ? Globe : Users;
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
            <Dialog.Panel className="mobile:rounded-2xl relative max-h-full flex flex-col gap-4 pb-4 mobile:bg-[hsl(var(--background))]">
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
                          placeholder="what is on your mind"
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

             

      {/* Privacy Controls */}
      <div className="w-full sticky bottom-0 backdrop-blur-sm">
        <div className="w-full flex px-4">
          <div className="w-full">
            <div className="pb-4 flex flex-col gap-3">
              
              {/* Audience Selector */}
              <div className="flex gap-3 items-center text-[#727272] text-sm">
                <span className="text-sm font-medium flex items-center gap-1">
                  <Users className="size-4 text-purple-500" />
                  Post to:
                </span>
                <div className="relative">
                  {/* Current Selection Button */}
                  <button
                    className="flex outline-none items-center justify-between gap-3 w-fit cursor-pointer rounded-xl bg-gradient-to-r bg-[hsl(var(--accent))] text-left sm:text-sm px-4 h-[38px] text-[#727272] transition-all duration-200 min-w-[160px] shadow-sm hover:shadow-md border border-[hsl(var(--border-color))]"
                    onClick={() => setShowAudienceDropdown(!showAudienceDropdown)}
                  >
                    <span className="flex items-center gap-2">
                      {selectedOption === 'everyone' ? (
                        <Globe className="size-4 text-blue-500" />
                      ) : (
                        <div className={`size-4 rounded-full bg-gradient-to-br `} />
                      )}
                      <span className="block truncate text-sm font-medium">{getAudienceText()}</span>
                    </span>
                    <ChevronDown className={`size-4 transition-transform duration-200 ${showAudienceDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showAudienceDropdown && (
                    <div className="absolute top-full mb-2 left-0 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-auto max-h-96 backdrop-blur-sm">
                      <div className="p-3">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">Choose your audience</div>
                        <div className="space-y-1">
                          {audienceOptions.map((option) => {
                            const isSelected = selectedOption === option.id;
                            const IconComponent = option.icon;
                            
                            return (
                              <button
                                key={option.id}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                                  isSelected 
                                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-md' 
                                    : 'hover:bg-gray-50 border-2 border-transparent'
                                }`}
                                onClick={() => handleOptionSelect(option.id)}
                              >
                                {option.isSpecial ? (
                                  <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                                    <IconComponent className="size-4 text-[--color]" />
                                  </div>
                                ) : (
                                  <div className={`size-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                                    <IconComponent className="size-4 text-[--color]" />
                                  </div>
                                )}
                                <div className="flex-1 text-left">
                                  <div className="text-sm font-semibold text-gray-800">{option.name}</div>
                                  <div className="text-xs text-gray-500">{option.description}</div>
                                </div>
                                {isSelected && (
                                  <div className="size-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                    <Check className="size-3 text-white" />
                                  </div>
                                )}
                                {option.isActive && !isSelected && (
                                  <div className="size-2 rounded-full bg-green-400 shadow-sm" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Reply Permission Selector */}
              <div className="flex gap-3 items-center text-[#727272] text-sm">
                <span className="text-sm font-medium  flex items-center gap-1">
                  <Smile className="size-4 text-green-500" />
                  Who can reply:
                </span>
                <div className="relative">
                  <button
                    className="flex outline-none items-center justify-between gap-3 w-fit cursor-pointer rounded-xl bg-[hsl(var(--accent))] text-left sm:text-sm px-4 h-[38px]  transition-all duration-200 shadow-sm hover:shadow-md border border-[hsl(var(--border-color))]"
                    onClick={() => setShowReplyDropdown(!showReplyDropdown)}
                  >
                    <span className="block truncate text-sm font-medium">
                      {replyPermission === 'everyone' ? 'Everyone can reply' : 
                       replyPermission === 'following' ? 'People you follow' : 
                       'Mentioned only'}
                    </span>
                    <ChevronDown className={`size-4 transition-transform duration-200 ${showReplyDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showReplyDropdown && (
                    <div className="absolute bottom-full mb-2 left-0 w-56 bg-[hsl(var(--background))] border border-[hsl(var(--border-color))] rounded-2xl shadow-2xl z-50 overflow-hidden">
                      <div className="p-2">
                        {['everyone', 'following', 'mentioned'].map((option) => (
                          <button
                            key={option}
                            className={`w-full text-left px-4 py-3 text-sm rounded-xl dark:hover:bg-white/5 hover:bg-black/5 transition-all duration-200 ${
                              replyPermission === option ? 'dark:hover:bg-white/5 bg-black/5 dark:bg-white/5 border border-[hsl(var(--border-color))]' : 'border border-transparent'
                            }`}
                            onClick={() => {
                              setReplyPermission(option);
                              setShowReplyDropdown(false);
                            }}
                          >
                            <div className="font-medium text-[--color]">
                              {option === 'everyone' ? 'Everyone can reply' :
                               option === 'following' ? 'People you follow' :
                               'Mentioned only'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
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
