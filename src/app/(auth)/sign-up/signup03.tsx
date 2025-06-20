"use client"
import React, { useState,FormEvent } from 'react'
import Signup04 from './signup04'

export default function Signup03() {
    const [open,setopen]=useState(false)
    const [gender,setGender]=useState("")
    const [next,setNext]=useState(false)
    const genderArray=["Male","Female","People"]
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setNext(true)
            
        }; 
    return (
        <>
            {!next?
                <div className="flex flex-1 items-center justify-center text-[--color]">
                    <div className="w-full max-w-[480px]">
                        <form className="flex flex-col gap-6" method="POST" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <h1 className="text-[22px] mobile:text-[26px] w-full text-black dark:text-white">Lorem ipsum dolor sit amet consectetur</h1>
                            <p className="text-muted-foreground text-sm mobile:text-[16px] text-balance text-[#727272]" >
                                id dolores quam corrupti doloremque. Iure ab, earum laudantium unde doloribus quis totam ?
                            </p>
                        </div>
                        <div className="mt-6 space-y-2">
                        <p className="text-subtle text-xs font-medium">Step 2 of 5</p>
                        <div
                            data-testid="step-indicator-container"
                            className="flex w-full space-x-2 rtl:space-x-reverse"
                        >
                            
                            <div
                            className="bg-[hsl(var(--accent))] h-1 w-full rounded-[1px] opacity-25 dark:opacity-100"
                            data-testid="step-indicator-1"
                            />
                                <div
                            className="dark:bg-white bg-black h-1 w-full rounded-[1px]"
                            data-testid="step-indicator-0"
                            />
                            <div
                            className="bg-[hsl(var(--accent))] h-1 w-full rounded-[1px] opacity-25 dark:opacity-100"
                            data-testid="step-indicator-2"
                            />
                            
                            <div
                            className="bg-[hsl(var(--accent))] h-1 w-full rounded-[1px] opacity-25 dark:opacity-100"
                            data-testid="step-indicator-3"
                            />
                            <div
                            className="bg-[hsl(var(--accent))] h-1 w-full rounded-[1px] opacity-25 dark:opacity-100"
                            data-testid="step-indicator-4"
                            />
                        </div>
                    </div>
                        <div className="grid gap-6">
                            <label htmlFor="sign-up-name" className="relative rounded-xl border bg-[rgba(225,225,225,.051)] dark:border-transparent border-[hsl(var(--border-color))] has-[input:focus]:border-[#4070f4] has-[input:focus]:bg-[hsl(var(--background))] px-[20px] py-[10px] pb-5 flex flex-col gap-1">
                                <div className="flex justify-between text-[12px] dark:text-white w-full">
                                    <p className='text-[#727272]'>Date of birth</p>
                                    {/* <Link href={""}>Forgot password</Link> */}
                                </div>
                                <div className="relative w-full mt-2.5">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        >
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="datepicker-autohide"
                                        required
                                    
                                        datepicker-autohide=""
                                        type="date"
                                        className="bg-[rgba(225,225,225,.051)] outline-none text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5  dark:placeholder-gray-400 dark:text-white "
                                        placeholder="Select date"
                                    />
                                </div>
                    
                            
                            </label>
                            <label htmlFor="sign-in-email" className="rounded-xl bg-[rgba(225,225,225,.051)] border dark:border-transparent border-[hsl(var(--border-color))] has-[div.jjdjjd]:border-[#4070f4] px-[20px] py-[10px] pb-5 flex flex-col gap-1">
                                <p className='text-[12px] text-[#727272]'>Gender</p>



                                <div className="relative inline-block text-left">
                                    <div className=' text-[--color]'>
                                        <button type="button" onClick={()=>setopen(!open)} className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-[rgba(225,225,225,.051)] px-3 py-[10px] text-sm text-[--col
                                        or] shadow-xs r" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        {gender?gender: "Gender"}
                                        <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        </svg>
                                        </button>
                                    </div>


                                        {/* Dropdown menu, show/hide based on menu state.

                                        Entering: "transition ease-out duration-100"
                                        From: "transform opacity-0 scale-95"
                                        To: "transform opacity-100 scale-100"
                                        Leaving: "transition ease-in duration-75"
                                        From: "transform opacity-100 scale-100"
                                        To: "transform opacity-0 scale-95" */}

                                    <div className={`${open ? "jjdjjd" :"hidden"} absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[hsl(var(--accent))] shadow-lg ring-1 ring-black/5 focus:outline-hidden`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                                        <div className="py-1" role="none" >
                                        {/* Active: "bg-gray-100 text-gray-900 outline-hidden", Not Active: "text-gray-700"  */}
                                            {genderArray.map((item,index)=>(
                                                <div 
                                                    className={`${gender===item ?"dark:bg-white dark:text-black bg-black text-white":"hover:bg-[rgba(225,225,225,.051)] dark:text-white text-black"} block px-4 py-3 text-sm `}
                                                    role="menuitem" 
                                                    tabIndex={-1} 
                                                    id="menu-item-0"
                                                    key={index}
                                                    onClick={()=>{
                                                        setopen(false)
                                                        setGender(item)
                                                    }}
                                                >
                                                    {item} 
                                                </div>
                                            ))}
                                            
                                            
                                        
                                        </div>
                                    </div>
                                </div>

                                
                            </label>
                            
                            
                            
                            <button
                            data-slot="button"
                            className="w-full px-6 py-2 flex justify-center bg-black text-white rounded-lg outline-none dark:bg-[#E5E5E5] dark:text-black"
                            type="submit"
                            >
                                Continiue
                                
                            </button>
                            
                        
                        </div>
                    
                            <div className="text-center text-sm">
                            Don't have an account?{/* */}{" "}
                            <a href="#" className="underline underline-offset-4">
                            Sign up
                            </a>
                        </div>
                        </form>
                    </div>
                </div>
            :<Signup04/>}
        </>
    )
}
