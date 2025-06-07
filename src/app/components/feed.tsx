"use client"
import Link from "next/link";
import ContentWrapper from "./contentWrapper";
import localFont from "next/font/local";
type daveA={
    dave:HomeFeed
}
const bricolageThin = localFont({
    src: "../../../public/fonts/BricolageGrotesque_72pt-Light.ttf",
});
export default function Feed({dave}: daveA) {
  return (
    <div className="flex flex-col relative border-b border-solid border-[hsl(var(--border-color))] last:border-none last:border-b-0" onClick={()=>console.log(dave)}>
      <div className="flex flex-col py-5 w-full"  role="article">
        <div className="gap-3 flex item-start w-full px-4 lg:px-0">
          <Link href={""}>
            <div className="w-9 h-9 rounded-[50%] bg-[hsl(var(--accent))]">
                <img
                    alt={dave.user.name}
                    src={dave.user.profileImage}
                    className="h-full w-full object-cover object-center rounded-full"
                />
            </div>
          </Link>
          <div className="w-full flex flex-col">
            <div className="w-full  flex flex-col gap-2">
              
                <div className="gap-1 flex flex-col">
                    <div className="flex flex-col">
                        <div className="flex justify-between gap-2">
                            <div className="flex gap-3 items-center">
                                <span className="font-[boldCal] tracking-wide decoration-0">
                                    
                                        <span className="text-black dark:text-[#EEEEEE] text-[15px] decoration-0">
                                            <Link
                                                href={"/"+ dave.user.username}
                                                className="hover:underline decoration-0"
                                            >
                                            {dave.user.name}
                                            </Link>
                                        </span>
                                    
                                </span>
                                <span className="">
                                    <span className="text-[13px] text-[#727272]">
                                        <Link
                                            title="Apr 23, 2025, 10:04 AM"
                                            href={"/"+ dave.user.username}
                                            className=""
                                            
                                        >
                                            
                                            May 11
                                            
                                        </Link>
                                    </span>
                                </span>
                            
                            </div>
                        <div className="flex gap-2">
                            <span className="h-fit font-bold inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                                {dave.tweatstars} Aura
                            </span>
                            <div className="">
                                <div
                                id="trigger5"
                                aria-expanded="false"
                                aria-haspopup="dialog"
                                aria-controls="dialog6"
                                aria-label="View more"
                                className="flex items-center"
                                >
                                <button
                                    tab-index="0"
                                    type="button"
                                    aria-label="More options"
                                    className=""
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
                    <div className="">
                    <div className="">
                        <div className="">
                            <p className={`text-black dark:text-[#EEEEEE] font-thin text-[15px] whitespace-pre-wrap tracking-wide decoration-0`}>
                                {dave.text && dave.text}
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
                {dave.img?.length ? 
                    <div className="block overflow-hidden w-full">
                        <div draggable="false" className={`flex bg-[hsl(var(--accent))] object-cover bg-center w-fit bg-cover  h-auto max-w-full max-h-[420px] overflow-hidden min-w-20 rounded-xl relative border border-[hsl(var(--border-color))] border-solid ${dave.img[0].aspectRatio? `aspect-[${dave.img[0].aspectRatio}]` : ""}`}>
                            <img src={dave.img[0]?.url} className="h-full w-full object-cover object-center invisible" />
                        </div>
                    </div>
                    // <ContentWrapper param={dave.img}/>
                    // <></>
                    :
                    <></>
                }
                <div className="gap-2 flex justify-between">
                    <div className="flex gap-[15px]">
                        <span className="flex ml-[-8px] ">
                            <button className="flex gap-[6px] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] rounded-[20px]">
                                <svg viewBox="0 0 20 20" stroke="#727272" fill="none" className="h-5 w-5 stroke-[1.5]"><path d="M5.00002 2.54822C8.00003 2.09722 9.58337 4.93428 10 5.87387C10.4167 4.93428 12 2.09722 15 2.54822C18 2.99923 18.75 5.66154 18.75 7.05826C18.75 9.28572 18.1249 10.9821 16.2499 13.244C14.3749 15.506 10 18.3333 10 18.3333C10 18.3333 5.62498 15.506 3.74999 13.244C1.875 10.9821 1.25 9.28572 1.25 7.05826C1.25 5.66154 2 2.99923 5.00002 2.54822Z"></path></svg>
                                <span className="text-sm text-[#727272] font-[boldCal]">1.5k</span>
                            </button>
                        </span>
                        <span className="flex ml-[-8px] ">
                            <button className="flex gap-[6px] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] rounded-[20px]">
                            <svg role="img" width="20" height="20" viewBox="0 0 20 20" fill="none" strokeWidth="1.5" stroke="#727272" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><g><title></title><path d="M18.7502 11V7.50097C18.7502 4.73917 16.5131 2.50033 13.7513 2.50042L6.25021 2.50044C3.48848 2.5004 1.25017 4.73875 1.2502 7.50048L1.25021 10.9971C1.2502 13.749 3.47395 15.9836 6.22586 15.9971L6.82888 16V19.0182L12.1067 16H13.7502C16.5116 16 18.7502 13.7614 18.7502 11Z"></path></g></svg>
                                <span className="text-sm font-[boldCal] text-[#727272]">200</span>
                            </button>
                        </span>
                        <span className="flex ml-[-8px] ">
                            <button className="flex gap-[6px] px-2 h-8 items-center hover:bg-[hsl(var(--accent))] rounded-[20px]">
                                <svg role="img" width="20" height="20" viewBox="0 0 20 20" fill="none" strokeWidth="1.5" stroke="#727272" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><g><title></title><path d="M2.53001 7.81595C3.49179 4.73911 6.43281 2.5 9.91173 2.5C13.1684 2.5 15.9537 4.46214 17.0852 7.23684L17.6179 8.67647M17.6179 8.67647L18.5002 4.26471M17.6179 8.67647L13.6473 6.91176M17.4995 12.1841C16.5378 15.2609 13.5967 17.5 10.1178 17.5C6.86118 17.5 4.07589 15.5379 2.94432 12.7632L2.41165 11.3235M2.41165 11.3235L1.5293 15.7353M2.41165 11.3235L6.38224 13.0882"></path></g></svg>
                                <span className="text-sm text-[#727272] font-[boldCal]">10</span>
                            </button>
                        </span>
                       
                    </div>
                    <div>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
