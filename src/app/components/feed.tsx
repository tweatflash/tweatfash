    "use client";
    import Link from "next/link";
    import React, { useEffect, useRef, useState } from "react";
    import { useRouter } from "next/navigation";
    import { useContext } from "react";
    import { AuthContext } from "@/app/context/Authcontext";
    import likePost from "../../../lib/likePost";
    import quickAction from "../../../lib/follow";
    import ContentWrapper from "./contentWrapper";
    import savePost from "../../../lib/savePost";
    import HighlightText from "./highlightedText";
    import { EyeOff, Sparkles, UserX, VolumeX } from "lucide-react";
    import { ReportModal } from "./reportModal";
    import { DeleteConfirmModal } from "./deleteConfrimModal";

    type daveA = {
      dave: HomeFeed;
    };

    export default function Feed({ dave }: daveA) {
      const router = useRouter();
      const iconRef = useRef<any>(null);
      const iconRef2 = useRef<any>(null);
      const {
        userObj,
        setToast,
        setMenuList,
        visible,
        setVisible,
        onClose,
        position,
        setPosition,
        anchorEl,
        openMenu,
        setAnchorEl,
        setCommentFeed,
        setCommentOpen,
        commentRoute,
        setCommentRoute,
        // setVisible
      }: any = useContext(AuthContext);
      const data:Auth=userObj
      function time(date: string): string {
        const now = new Date();
        const past = new Date(date);
        const diff = now.getTime() - past.getTime();

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 7) {
          return past.toLocaleString("en-US", { month: "short", day: "numeric" });
        } else if (days > 0) {
          return days + (days === 1 ? "d" : "d");
        } else if (hours > 0) {
          return hours + (hours === 1 ? "h" : "h");
        } else if (minutes > 0) {
          return minutes + (minutes === 1 ? "m" : "m");
        } else {
          return seconds + (seconds === 1 ? "s" : "s");
        }
      }
      const longFormatTime = (
        ISODATE: string
      ): {
        longDate: string;
        longTime: string;
      } => {
        const isoDate = "2025-04-13T17:53:47.479Z";
        const date = new Date(ISODATE);
        const longDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const longTime = date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          // timeZoneName: "short",
          // timeZone: "Africa/Lagos",
        });
        return { longDate, longTime };
        // Output: Sunday, April 13, 2025, 5:53:47 PM UTC
      };
      const handleParent = (postId: string, username: string): void => {
        // router.push(`/${username}/status/${postId}`);
        console.log(dave);
      };
      const handleChild = (event: React.MouseEvent): void => {
        event.stopPropagation();
      };
      const checkIfFollowing=(id:string)=>{
        const a=data?.user.followers
        const b=data?.user.following
        const combined = a && [...a, ...b];
        const isFollowing = combined && combined.some(user => user._id === id);
        return isFollowing
      }
      const [following,setfollowing]=useState(
      checkIfFollowing(dave.user._id)
      )
      const [report,setReport]=useState(false)
      const closeReport=()=>{
        setReport(false)
      }
      const followAUser =async (id:string,name:string)=>{
        if (following) {
          setToast({
            valid: true,
            msg: "You Unfollowed"+" "+name,
            isFunction: "",
            function: null,
          });
          
        //   dave.likes = dave.likes.filter((item) => item._id !== userObj.user._id);
        } else {
          setToast({
            valid: true,
            msg: "You Followed"+" "+name,
            isFunction: "",
            function: null,
          });
        
        }
        setfollowing(!following);
        setVisible(false)
        const data = await quickAction({type:"follow",data:id});
        console.log(data);
      }
      const repostPost=async (id:string)=>{
        const data = await quickAction({type:"repost",data:id});
        console.log(data);
        setToast({
            valid: true,
            msg: 'You Reposted a Post',
            isFunction: "",
            function: null,
          });
          setVisible(false)
      }
      const [deletePost,setdeletePost]=useState(false)
      const [deleted,setDeleted]=useState(false)
      const deleteAPost= async (id:string)=>{
        
        setDeleted(true)
        setVisible(false)
        const data = await quickAction({type:"delete",data:id});
        setToast({
          valid: true,
          msg: 'Post deleted succesfully',
          isFunction: "",
          function: null,
        });
      }
      const doSone = () => {
        console.log("dio something");
      };
      const [liked, setLiked] = useState(
        userObj?.user &&
          userObj.user.likedPosts.some((item: any) => item._id == dave._id)
          ? true
          : false
      );
      const [saved, setSaved] = useState(
        userObj?.user && userObj.user.flags.some((item: any) => item == dave._id)
          ? true
          : false
      );
      const [repost,setRepost]=useState(false)
      const handleCopy = async (textToCopy:string) => {

        try {
            const currentDomain = new URL(window.location.href).hostname;
            const text=currentDomain+textToCopy

          await navigator.clipboard.writeText(text);
          setToast({
            valid: true,
            msg: 'Link copied to clipboard!',
            isFunction: "",
            function: null,
          });
        } catch (err) {
          setToast({
            valid: true,
            msg: 'Failed to copy to clipboard!',
            isFunction: "",
            function: null,
          });
        }finally{
            setVisible(false)
        }
      };
      const reportPost =()=>{
        setReport(true)
        setVisible(false)
      }
      const likeAPost = async (postId: string) => {
        if (liked) {
          setLiked(false);
          dave.likes = dave.likes.filter((item) => item._id !== userObj.user._id);
        } else {
          setLiked(true);
          const newItem = { _id: postId };
          userObj.user.likedPosts.push(newItem);
          // dave.likes.push(postId)

          const newLike = {
            _id: userObj.user._id,
            name: userObj.user.name,
            username: userObj.user.username,
            profileImage: userObj.user.profileImage,
            coverImage: userObj.user.coverImage,
          };
          dave.likes.push(newLike);
          // const result =await data
          // console.log(result)
        }
        const data = await likePost(postId);
        console.log(data);
      };
      const postEng =(username:string,postId:string)=>{
        setVisible(false)
        router.push(`/${username}/status/${postId}/likes`)
      }
      const saveAPost = async (postId: string) => {
        if (saved) {
          setSaved(false);
          userObj.user.flags = userObj.user.flags.filter(
            (item: string) => item !== dave._id
          );
          setToast({
            valid: true,
            msg: "Post Unsaved successfully",
            isFunction: "",
            function: null,
          });
        } else {
          setSaved(true);
          userObj.user.flags.push(postId);
          setToast({
            valid: true,
            msg: "Post saved successfully",
            isFunction: "",
            function: null,
          });
        }
        const data = await savePost(postId);
      };
      const blockUser=()=>{
        setblocked(true)
        setVisible(false)
      }
      const mutePost=()=>{
        setMuted(true)
        setVisible(false)
      }
      const hidePost=()=>{
        setHidden(true)
        setVisible(false)
      }
      const [hidden,setHidden]=useState(false)
      const [muted,setMuted]=useState(false)
      const [blocked,setblocked]=useState(false)
      
      if (hidden) {
        return (
          <div className="border-b w-full border-[hsl(var(--border-color))] bg-[hsl(var(--accent))]">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-[#727272]">
                  <EyeOff className="h-4 w-4 mr-2" />
                  <span>This post was hidden</span>
                </div>
                <button
                  onClick={() => setHidden(false)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Show
                </button>
              </div>
            </div>
          </div>
        );
      }
      if (deleted){
        return (
          <></>
        )
      }
      if (muted) {
        return (
          <div className="border-b w-full border-[hsl(var(--border-color))] bg-[hsl(var(--accent))]">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-[#727272]">
                  <VolumeX className="h-4 w-4 mr-2" />
                  <span>This post was muted</span>
                </div>
                <button
                  onClick={() => setMuted(false)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Unmute
                </button>
              </div>
            </div>
          </div>
        );
      }
      if (blocked) {
        return (
          <div className="border-b border-[hsl(var(--border-color))]  bg-red-50 dark:bg-red-900/20">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-[--color]">
                  <UserX className="h-4 w-4 mr-2" />
                  <span>You blocked @{dave.user.username}</span>
                </div>
                <button
                  onClick={() => setblocked(false)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Unblock
                </button>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div
          className="flex cursor-pointer flex-col relative border-b border-solid border-[hsl(var(--border-color))] last:border-none last:border-b-0"
          onClick={() => handleParent(dave._id, dave.user.username)}
        >
          <div className="flex flex-col py-5 w-full" role="article">
            <div className="gap-3 flex item-start w-full px-4 lg:px-0">
              <Link
                href={"/" + dave.user.username}
                className="h-fit"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  // Logic to view image or open image viewer
                }}
              >
                <div className="w-9 h-9 rounded-[50%] border border-[hsl(var(--border-color))] bg-[hsl(var(--accent))]">
                  <img
                    alt={dave.user.name}
                    src={dave.user.profileImage}
                    className="h-full w-full object-cover object-center rounded-full"
                  />
                </div>
              </Link>
              <div className="w-full flex flex-col">
                <div className="w-full  flex flex-col gap-2">
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <div className="flex justify-between gap-2">
                        <div className="flex items-center w-full h-full">
                          <div className="w-full h-full tracking-wide decoration-0 flex">
                            <div className="flex justify-between gap-2">
                              <div className="flex">
                                <span className="text-black w-full font-[500] dark:text-[#EEEEEE] text-[15px] decoration-0 ">
                                  <Link
                                    href={"/" + dave.user.username}
                                    className="hover:underline decoration-0 "
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Logic to view image or open image viewer
                                    }}
                                  >
                                    {dave.user.name}
                                  </Link>
                                </span>
                              </div>
                              <span className="">
                                <span className="text-[13px] text-[#727272] ">
                                  <Link
                                    title={
                                      longFormatTime(dave.createdAt).longDate +
                                      " " +
                                      longFormatTime(dave.createdAt).longTime
                                    }
                                    href={"/" + dave.user.username}
                                    className=""
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Logic to view image or open image viewer
                                    }}
                                  >
                                    {time(dave.createdAt)}
                                  </Link>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="">
                            {dave.tweatstars === 0 ? (
                              <button className="h-fit inline-flex whitespace-nowrap items-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs text-gray-600 dark:text-gray-400 ring-1 ring-gray-500/10 ring-inset hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <Sparkles className="w-3 h-3 mr-1" />
                                0 Aura
                              </button>
                            ) : (
                              <button className="h-fit inline-flex whitespace-nowrap items-center rounded-md bg-amber-50 dark:bg-amber-900/30 px-2 py-1 text-xs text-amber-700 dark:text-amber-300 ring-1 ring-amber-500/20 ring-inset hover:bg-amber-100 dark:hover:bg-amber-800/50 transition-colors">
                                <Sparkles className="w-3 h-3 mr-1" />
                                {dave.tweatstars} Aura
                              </button>
                            )}
                          </div>
                          <div className="flex items-center">
                            <div
                              id="trigger5 "
                              aria-expanded="false"
                              aria-haspopup="dialog"
                              aria-controls="dialog6"
                              aria-label="View more"
                              className="flex items-center h-full"
                            >
                              <button
                                tab-index="0"
                                type="button"
                                aria-label="More options"
                                ref={iconRef}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMenuList([
                                    {
                                      name:following ? "Unfollow": "follow",
                                      function: () => followAUser(dave.user._id,dave.user.name),
                                      type: dave.user._id === userObj.user._id ? "hide" :"good",
                                      id:"UserRound"
                                    },
                                    {
                                      name: "Copy link",
                                      function: () => handleCopy("/"+dave.user.username+"/"+"status"+"/"+dave._id),
                                      type: "good",
                                      id:"Link"
                                    },
                                    {
                                      name: "Mute",
                                      function: () => mutePost(),
                                      type:  dave.user._id === userObj.user._id ? "hide" :"good",
                                      id: "VolumeX",
                                    
                                    },
                                    {
                                      name: "View post engagements",
                                      function: () => postEng(dave.user.username,dave._id),
                                      type:"good",
                                      id: "ChartColumn",
                                    },
                                    {
                                      name: "Hide",
                                      function: () => hidePost(),
                                      type:  dave.user._id === userObj.user._id ? "hide" :"danger",
                                      id: "EyeOff",
                                    },
                                    {
                                      name: "Block",
                                      function: () => blockUser(),
                                      type: dave.user._id === userObj.user._id ? "hide" : "danger",
                                      id: "Ban",
                                    },
                                    {
                                      name: "Report",
                                      function: () => reportPost(),
                                      type: dave.user._id === userObj.user._id ? "hide" :"danger",
                                      id: "CircleAlert",
                                    },
                                    {
                                      name: "Delete",
                                      function: () => setdeletePost(true),
                                      type: dave.user._id !== userObj.user._id ? "hide" :"danger",
                                      id: "Trash2",
                                    },
                                  ]);
                                  openMenu(iconRef.current);
                                  // Logic to view image or open image viewer
                                }}
                                className="hover:bg-[hsl(var(--accent))] h-full flex items-center aspect-square rounded-lg justify-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className=" stroke-gray-900 dark:stroke-gray-200"
                                >
                                  <circle cx="12" cy="12" r="1"></circle>
                                  <circle cx="19" cy="12" r="1"></circle>
                                  <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <span className="text-[#727272] text-[15px]">
                                    <Link
                                        href="/@oyinosikoya?"
                                        className=""
                                    >
                                        @oyinosikoya
                                    </Link>
                                </span> */}
                    </div>
                    {dave.text && (
                      <div className="flex">
                        <div className="flex">
                          <div className="flex">
                            <p
                              className={`text-[--color] break-all break-words font-[400] text-[15px] whitespace-pre-wrap tracking-wide decoration-0`}
                            >
                              <HighlightText text={dave.text} />
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <ContentWrapper param={dave} />
                  <div className="gap-2 flex justify-between">
                    <div className="flex gap-[15px]">
                      <span className="flex ml-[-8px] ">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            likeAPost(dave._id);
                            // Logic to view image or open image viewer
                          }}
                          className={`
                                            flex gap-[6px] px-2 h-8 items-center rounded-[20px] 
                                            ${
                                              liked
                                                ? "hover:bg-[hsl(var(--accent))] text-[#eb5757]"
                                                : "hover:bg-[hsl(var(--accent))] text-[#727272] hover:text-[--color]"
                                            }
                                        `}
                        >
                          <svg
                            viewBox="0 0 20 20"
                            stroke={"currentColor"}
                            fill={liked ? "#eb5757" : "none"}
                            className="h-5 w-5 stroke-[1.5]"
                          >
                            <path d="M5.00002 2.54822C8.00003 2.09722 9.58337 4.93428 10 5.87387C10.4167 4.93428 12 2.09722 15 2.54822C18 2.99923 18.75 5.66154 18.75 7.05826C18.75 9.28572 18.1249 10.9821 16.2499 13.244C14.3749 15.506 10 18.3333 10 18.3333C10 18.3333 5.62498 15.506 3.74999 13.244C1.875 10.9821 1.25 9.28572 1.25 7.05826C1.25 5.66154 2 2.99923 5.00002 2.54822Z"></path>
                          </svg>
                          {dave.likes.length ? (
                            <span className={`text-sm `}>{dave.likes.length}</span>
                          ) : (
                            <></>
                          )}
                        </button>
                      </span>
                      <span className="flex ml-[-8px] ">
                        <button
                          className="flex gap-[6px] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] fill-[#727272] hover:fill-[--color] rounded-[20px]"
                          onClick={(e) => {
                            // handleParent(dave._id ,dave.user.username)
                            e.stopPropagation();
                            setCommentFeed(dave);
                            setCommentOpen(true);
                            setCommentRoute(`posts/commentOrReply/${dave._id}`);
                          }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="size-5"
                            aria-hidden="true"
                          >
                            <g>
                              <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                            </g>
                          </svg>
                          {dave.commentCount ? (
                            <span className="text-sm text-[#727272]">
                              {dave.commentCount}
                            </span>
                          ) : (
                            <></>
                          )}
                        </button>
                      </span>
                      <span className="flex ml-[-8px] ">
                        <button
                          className="flex gap-[6px] px-2 h-8 stroke-[#727272] hover:stroke-[--color] items-center hover:bg-[hsl(var(--accent))] rounded-[20px]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuList([
                                    
                                    {
                                      name: "Repost",
                                      function: () => repostPost(dave._id),
                                      type: "good",
                                      id:"RefreshCcw"
                                    },
                                    {
                                      name: "Requote",
                                      function: () => setCommentFeed(dave),
                                      type: "good",
                                      id: "PencilLine",
                                    },
                                    
                                  ]);
                            openMenu(iconRef2.current);
                            // Logic to view image or open image viewer
                          }}
                          ref={iconRef2}
                          
                        >
                          <svg
                            role="img"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                          >
                            <g>
                              <title></title>
                              <path d="M2.53001 7.81595C3.49179 4.73911 6.43281 2.5 9.91173 2.5C13.1684 2.5 15.9537 4.46214 17.0852 7.23684L17.6179 8.67647M17.6179 8.67647L18.5002 4.26471M17.6179 8.67647L13.6473 6.91176M17.4995 12.1841C16.5378 15.2609 13.5967 17.5 10.1178 17.5C6.86118 17.5 4.07589 15.5379 2.94432 12.7632L2.41165 11.3235M2.41165 11.3235L1.5293 15.7353M2.41165 11.3235L6.38224 13.0882"></path>
                            </g>
                          </svg>
                          {dave.reposts.length ? (
                            <span className="text-sm text-[#727272]">
                              {dave.reposts.length}
                            </span>
                          ) : (
                            <></>
                          )}
                        </button>
                      </span>
                    </div>
                    <div className="flex flex-row gap-3">
                      <span className="flex ml-[-8px] ">
                        <button
                          className="text-[#727272] hover:text-[--color] flex gap-[6px] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] rounded-[20px]"
                          onClick={(e) => {
                            e.stopPropagation();
                            saveAPost(dave._id);
                            // Logic to view image or open image viewer
                          }}
                        >
                          {saved ? (
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="size-5"
                              fill="currentColor"
                            >
                              <g>
                                <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z" />
                              </g>
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="size-5"
                              role="img"
                              fill="currentColor"
                            >
                              <g>
                                <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
                              </g>
                            </svg>
                          )}
                        </button>
                      </span>
                      <span className="flex ml-[-8px] ">
                        <button
                          className="flex gap-[6px] stroke-[#727272] hover:stroke-[--color] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] rounded-[20px]"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Logic to view image or open image viewer
                          }}
                        >
                          <svg
                            role="img"
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g>
                              <title></title>
                              <path d="M10.2171 2.2793L10.2171 12.9745M10.2171 2.2793L13.333 4.99984M10.2171 2.2793L7.08301 4.99984M2.49967 10.9925L2.49967 14.1592C2.49967 16.011 4.00084 17.5121 5.85261 17.5121L14.9801 17.5121C16.8318 17.5121 18.333 16.011 18.333 14.1592L18.333 10.9925"></path>
                            </g>
                          </svg>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
            <ReportModal username={dave.user.username} postId={dave._id} isOpen={report} onClose={closeReport} onSubmit={()=>setReport(false)}/>
            <DeleteConfirmModal isOpen={deletePost} onClose={()=>setdeletePost(false)} onConfirm={()=>deleteAPost(dave._id)} postContent="ns" msg={{title:"Delete post",des:"This action cannot be undone" , action:"Delete post"}}/>
          
        </div>
      );
    }
