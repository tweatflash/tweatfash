"use client";
import React from "react";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useState,FormEvent } from "react"
import { useGoogleLogin } from '@react-oauth/google';
import Signup02 from './signup02'
import Signup03 from './signup03'
import Signup04 from './signup04';
export default function Signup01() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const [next,setNext]=useState(false)
    const [email,setEmail]=useState("")
    const [validEmail,setValidEmail]=useState(emailRegex.test(email))
    const [password,setPassword] =useState("")
    const [emailError,setEmailerror]=useState({
        "isValid":true,
        "emailError":""
    })
    const [isPending,setIsPending]=useState(false)
    const [invalid,setInvalid]=useState(true)
    const router=useRouter()
    
    const handleLogin= async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setNext(true)
        if (email && password){
            setIsPending(true)
            setEmailerror({
                "isValid":true,
                "emailError":""
            })
            try {
                const request= await fetch(`https://tweatflash-web-app.onrender.com/api/v1/auth/login/`,{
                    method:"POST",  
                    headers: {
                        'Content-Type': 'application/json',                                                                                                                                                                                                                       
                    },
                    body:JSON.stringify({
                        "email":email,
                        "password":password
                    })
            
                })
                const response =await request
                const data=await response.json()
                response?.status && setIsPending(false)
                console.log(data)
                if (response.status===200 && (data.refreshTokenJWT && data.accessTokenJWT)){ 
                    Cookies.set("RFTFL", data.refreshTokenJWT, { expires: 1 })
                    Cookies.set("ACTFL", data.accessTokenJWT, { expires: 1 })
                    window.location.reload()
                }else{
                    setEmailerror({
                        "isValid":false,
                        "emailError":"Email or password is incorrect."
                    })
                }      
            } catch (error) {
                setEmailerror({
                    "isValid":false,
                    "emailError":"Sorry an unexpected error occured possibly your network"
                 })
            }      
        }
    }
    const login:any = useGoogleLogin({

        onSuccess: async (response) =>{
            // showLoader()
            try {
                const res =await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{
                    headers:{
                        Authorization:`Bearer ${response.access_token}`,
                    },
                })
                const dat=await res.json()
                console.log(dat)
              // 
            } catch (error) {
                console.log(error)
            }
        }
    });
    return (
        <>
        { !next?
            <div className="flex flex-1 items-center justify-center text-[--color]">
                <div className="w-full max-w-[480px]">
                    <form className="flex flex-col gap-6" method="POST" onSubmit={handleLogin}>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-[22px] mobile:text-[26px] font-bold w-full text-black dark:text-white">Getting started provide your name and email address</h1>
                        <p className="text-muted-foreground text-sm mobile:text-[16px] text-balance text-[#727272]" >
                            this is username tweatflash.com/username and your full name you use in real life
                        </p>
                    </div>
                    <div className="mt-6 space-y-2">
                        <p className="text-subtle text-xs font-medium">Step 1 of 5</p>
                        <div
                            data-testid="step-indicator-container"
                            className="flex w-full space-x-2 rtl:space-x-reverse"
                        >
                            <div
                            className="dark:bg-white bg-black h-1 w-full rounded-[1px]"
                            data-testid="step-indicator-0"
                            />
                            <div
                            className="bg-[hsl(var(--accent))] h-1 w-full rounded-[1px] opacity-25 dark:opacity-100"
                            data-testid="step-indicator-1"
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
                        <label htmlFor="sign-up-name" className="relative rounded-xl border bg-[rgba(225,225,225,.051)] dark:border-transparent border-[hsl(var(--border-color))] has-[input:focus]:border-[#4070f4] has-[input:focus]:bg-[hsl(var(--background))] px-[20px] py-[10px] flex flex-col gap-1">
                            <div className="flex justify-between text-[12px] dark:text-white w-full">
                                <p className='text-[#727272]'>Name</p>
                                {/* <Link href={""}>Forgot password</Link> */}
                            </div>
                            <input
                                type="text"
                                id="sign-up-name" 
                                name="text" 
                                placeholder="Scott stillman"
                                className="w-full h-6 bg-transparent border-none outline-none text-sm text-[--color]"
                                onChange ={(e)=> setPassword(e.target.value)}
                                aria-describedby="uidnote"
                                autoComplete="on"
                                value={password}
                            />
                
                        
                        </label>
                        <label htmlFor="sign-in-email" className="rounded-xl bg-[rgba(225,225,225,.051)] border dark:border-transparent border-[hsl(var(--border-color))] has-[input:focus]:border-[#4070f4] px-[20px] py-[10px] flex flex-col gap-1">
                            <p className='text-[12px] text-[#727272]'>Email</p>
                            <input
                                type="email"
                                id="sign-in-email" 
                                name="email" 
                                value={email}
                                className="w-full h-6 bg-transparent border-none outline-none text-sm text-[--color]"
                                onChange ={(e)=> setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                aria-describedby="uidnote"
                                autoComplete="on"
                            />
                        
                        </label>
                        
                        
                        
                        <button
                        data-slot="button"
                        className="w-full px-6 py-2 flex justify-center bg-black text-white rounded-lg outline-none dark:bg-[#E5E5E5] dark:text-black disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed"
                        type="submit"

                        >
                            {
                                isPending ?<svg
                                className=" animate-spin text-white size-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                className="opacity-25"
                                cx={12}
                                cy={12}
                                r={10}
                                stroke="currentColor"
                                strokeWidth={4}
                                />
                                <path
                                className="opacity-75 fill-white dark:fill-black"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>: "Continiue"
                            }
                        </button>
                        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-[hsl(var(--background))] text-muted-foreground relative z-10 px-2 ">
                            Or continue with
                        </span>
                        </div>
                    
                    </div>
                    <button
                            data-slot="button"
                            className="inline-flex items-center justify-between gap-4 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:cursor-not-allowed hover:opacity-70 disabled:opacity-40 [&_svg]:pointer-events-none [&img:not([class*='size-'])]:size-4 shrink-0 [&img]:shrink-0 outline-none shadow-xs hover:bg-[accent]  px-6 py-4 text-[--color] w-full bg-[hsl(var(--accent))] text-[16px] tracking-wide border dark:border-transparent border-[hsl(var(--border-color))]"
                            onClick={login}
                            disabled={validEmail}
                        >
                            <img src="/google.svg" className="size-6" alt="google"/>
                            <span className="flex w-full">Continue with Google</span>
                            <svg
                                width={21}
                                height={20}
                                viewBox="0 0 21 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="arrow-right"
                                >
                                <path
                                    d="M4.66667 10H16.3333"
                                    stroke="#D4D6FF"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10.5 4.16675L16.3333 10.0001L10.5 15.8334"
                                    stroke="#D4D6FF"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                        </button>
                        <div className="text-center text-sm">
                        Don't have an account?{/* */}{" "}
                        <a href="#" className="underline underline-offset-4">
                        Sign up
                        </a>
                    </div>
                    </form>
                </div>
            </div>
        : <Signup03/>}
        </>
    );
}
