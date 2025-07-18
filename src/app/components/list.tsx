// components/Menu.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/Authcontext';

export default function Menu() {
    const { visible, position, onClose,mobile }:any=useContext(AuthContext)
    if (!visible) return null;

    return (
        <>
            <div className="absolute mobile:bg-transparent  bg-black/5 inset-0  w-full h-full z-20"  onClick={onClose}/>
            <div
            className={`absolute flex flex-col gap-1 z-50 text-[--color] bg-[hsl(var(--background))] dark:bg-[rgb(27,28,29)] border-[hsl(var(--border-color))] shadow-md border rounded-[15px] p-2 w-[240px] ${mobile && "rounded-bl-none rounded-br-none pt-5 px-4 bdy-hn"}`}
            style={mobile ? { position:"fixed", bottom:0,width:"100%",left:0}: { top: position.top, left: position.left }}
            >
            <button
                className="text-[--color] flex w-full justify-between text-[15px] items-center gap-2 rounded-lg px-3 py-2 hover:bg-[hsl(var(--accent))]"
                id="headlessui-menu-item-:r0:"
                role="menuitem"
                tabIndex={-1}
                data-headlessui-state=""
                >
                
                <span>
                    Copy Link
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>


                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                    ⌘E
                </kbd>
            </button>
            <button
                className="text-[--color] flex w-full justify-between text-[15px] items-center gap-2 rounded-lg px-3 py-2 hover:bg-[hsl(var(--accent))]"
                id="headlessui-menu-item-:r0:"
                role="menuitem"
                tabIndex={-1}
                data-headlessui-state=""
                >
                
                <span>
                    Follow
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>

                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                    ⌘E
                </kbd>
            </button>
            <button
                className="text-[--color] flex w-full justify-between text-[15px] items-center gap-2 rounded-lg px-3 py-2 hover:bg-[hsl(var(--accent))]"
                id="headlessui-menu-item-:r0:"
                role="menuitem"
                tabIndex={-1}
                data-headlessui-state=""
                >
                
                <span>
                    Mute
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>

                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                    ⌘E
                </kbd>
            </button>
            <div className="my-1 h-px bg-[hsl(var(--border-color))]" role="none" />
            <button
                className="text-[--color] flex w-full justify-between text-[15px] items-center gap-2 rounded-lg px-3 py-2 hover:bg-[hsl(var(--accent))]"
                id="headlessui-menu-item-:r0:"
                role="menuitem"
                tabIndex={-1}
                data-headlessui-state=""
                >
                
                <span>
                    Hide
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>


                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                    ⌘E
                </kbd>
            </button>
            <button
                className="text-red-400 flex w-full justify-between text-[15px] items-center gap-2 rounded-lg px-3 py-2 hover:bg-[hsl(var(--accent))]"
                id="headlessui-menu-item-:r0:"
                role="menuitem"
                tabIndex={-1}
                data-headlessui-state=""
                >
                
                <span>
                    Block
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>

                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                    ⌘E
                </kbd>
            </button>
            <button
                className="text-red-400 flex w-full justify-between text-[15px] items-center gap-2 rounded-lg px-3 py-2 hover:bg-[hsl(var(--accent))]"
                id="headlessui-menu-item-:r0:"
                role="menuitem"
                tabIndex={-1}
                data-headlessui-state=""
                >
                
                <span>
                    Report
                </span>
            
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                    >
                    <circle cx={12} cy={12} r={10} />
                    <line x1={12} x2={12} y1={8} y2={12} />
                    <line x1={12} x2="12.01" y1={16} y2={16} />
                    </svg>

                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                    ⌘E
                </kbd>
            </button>
            </div>
        </>
    );
}