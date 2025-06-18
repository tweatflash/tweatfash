"use client"
import ExploreComponent from "@/app/components/exploreComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState,FormEvent } from "react";

import CommandPalette from "./command";
type Prop={
    searchTerm:string
}


export default function ClientPage( {searchTerm}:Prop) {
    const router=useRouter()
    const handleSearch = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/explore/${search}/`);
    };   
    const displayTerm = searchTerm.replace("%20", " ");
    const [search,setSearch] =useState(displayTerm)
    const tabs = ["Suggested","Posts","People" ,"communites" ,"hashtag"];  
    const [isPaletteOpen, setIsPaletteOpen] = useState(true);

    const openPalette = () => setIsPaletteOpen(true);
    const closePalette = () => setIsPaletteOpen(false);
    return (
        <div className="w-full max-w-[568px] text-[--color] flex gap-4 flex-col " >
            <div className="flex w-full pt-4 px-4 flex-col relative" >
                <label htmlFor="explore-search" className="inline-flex items-center gap-2 border h-auto has-[input:focus]:border-[#4070f4] border-[hsl(var(--border-color))] bg-[hsl(var(--accent))] px-4 py-2 relative w-full justify-start rounded-[0.5rem]  text-sm font-normal shadow-none text-[#727272]">
                    <div className="pointer-events-none h-5 select-none items-center gap-1 rounded border border-[hsl(var(--border-color))] bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>K
                    </div>
                    <form className=" flex-1" method="POST" onSubmit={handleSearch} onClick={()=>openPalette()}>
                        <input
                            type="text"
                            className="w-full bg-transparent outline-none border-none h-6 text-[--color]"
                            placeholder="Search tweatflash..."
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            id="explore-search"
                        />
                    </form>
                  
                </label>
                
            </div>
            <div className="flex flex-col justify-start relative overflow-x-hidden resize-none px-4">
        
            <div className="w-full relative overflow-x-auto flex flex-col h-8 no-scrollbar">
                
                <div className="flex min-w-full justify-start absolute m-auto w-fit gap-2">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={`flex-1 whitespace-nowrap text-center text-sm text-nowrap h-8 rounded-lg px-3 font-bold bg-[hsl(var(--accent))] ${
                            0 === index ? "bg-black text-white dark:bg-white dark:text-black" : "text-[#777777]"
                            }`}
                        
                        >
                            {tab}
                        </button>
                    ))}
                </div> 
            </div>
                
            </div>
            <div className="border-t border-[hsl(var(--border-color))] p-4 pb-0 flex flex-col">
                <ExploreComponent suggestedData={displayTerm} />
                
            </div>
        </div>
    )
}
