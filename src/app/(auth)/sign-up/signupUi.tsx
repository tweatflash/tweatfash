"use client"
import { Inter } from "next/font/google";
import React from "react";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useState,FormEvent } from "react"
import { useGoogleLogin } from '@react-oauth/google';
const interFont=Inter({
  subsets:["latin"],
  fallback:[ "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
})
export default function LoginPage() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const [email,setEmail]=useState("")
    const [password,setPassword] =useState("")
    const [emailError,setEmailerror]=useState({
        "isValid":false,
        "emailError":""
    })
    const [isPending,setIsPending]=useState(false)
    const router=useRouter()

    const handleLogin= async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if (email && password){
            setIsPending(true)
          const request= await fetch(`https://tweatflash-web-app.onrender.com/api/v1/auth/login/`,{
            method:"POST",  
            headers: {
              'Content-Type': 'application/json',                                                                                                                                                                                                                       
            },
            body:JSON.stringify({
              "email":email,
              "password":password
            })
            
            }
          )
          const response =await request
          const data=await response
          const data2 =await data.json()
          console.log(data2)
          if (data.status===200){
            Cookies.set("RFTFL", data2.refreshTokenJWT, { expires: 7 });
            Cookies.set("ACTFL", data2.accessTokenJWT, { expires: 7 });
            window.location.reload()
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
        <div className="w-full min-h-screen text-white dark:bg-brand dark:text-brand-contrast text-emphasis [--cal-brand-emphasis:#101010] [--cal-brand-subtle:#9CA3AF] [--cal-brand-text:white] [--cal-brand:#111827] dark:[--cal-brand-emphasis:#e1e1e1] dark:[--cal-brand-text:black] dark:[--cal-brand:white] flex items-center justify-center">
        <div className="bg-subtle dark:bg-default flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <h3 className="logo mx-auto mb-auto">
            <strong>
                <img
                className="h-10 w-auto"
                alt="Cal"
                title="Cal"
                src="/tweatflash.svg"
                />
            </strong>
            </h3>
            <div className="ml-auto mr-auto mt-0 flex w-full max-w-xl flex-col px-4 pt-6 sm:px-16 md:px-20 lg:mt-24 2xl:px-28">
                <div className="flex w-fit lg:-mt-12">
                    <button
                        className="group whitespace-nowrap font-medium relative disabled:cursor-not-allowed gap-1 text-[#727272] border border-transparent disabled:opacity-30 bg-[hsl(var(--accent))] duration-200 text-sm leading-none hover:bg-subtle todesktop:mt-10 mb-6 flex h-6 max-h-6 w-full items-center rounded-md px-3 py-2"
                        data-testid="signup-back-button"
                        type="button"
                    >
                    
                    <svg
                        height={16}
                        width={16} 
                        viewBox="0 0 1024 1024" 
                        xmlns="http://www.w3.org/2000/svg" fill="#727272"
                    >
                    
                        <g id="SVGRepo_iconCarrier">
                            <path fill="#727272" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#727272" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path>
                        </g>
                    </svg>
                    <div className="contents visible group-active:translate-y-[0.5px]">
                        Back
                    </div>
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="font-[boldCal] text-white text-[28px] leading-none ">
                    Welcome back to tweatflash social
                    </h1>
                    <p className="text-[#727272] font-bold text-base  leading-5">
                    Free for individuals. Team plans for collaborative features.
                    </p>
                </div>
                <div className="mt-12">
                    <div className="space-y-3">
                    <button
                        className="group whitespace-nowrap inline-flex items-center font-medium relative rounded-[10px] disabled:cursor-not-allowed gap-1 bg-brand-default text-brand  transition-transform duration-100 px-2.5 py-2 text-sm leading-none w-full justify-center bg-white"
                        data-testid="google"
                        type="button"
                        onClick={()=>login()}
                    >
                        <img
                        className="text-subtle mr-2 h-4 w-4"
                        src="/google.svg"
                        alt="Continue with Google Icon"
                        />
                        <div className="contents text-black   font-[boldCal] visible group-active:translate-y-[0.5px]">
                        <span>Sign in with Google</span>
                        </div>
                    </button>
                    
                    </div>

                    <form method="POST" onSubmit={handleLogin} className={`${interFont.className} flex flex-col gap-4`}>
                        <div className="mt-5">
                            <label
                            className="text-emphasis mb-2 block text-sm font-medium leading-none"
                            htmlFor="«r11»"
                            >
                            Email
                            </label>
                            <input
                                id="signup-email"
                                placeholder="example@gmail.com"
                                autoComplete="email"
                                data-testid="signup-emailfield"
                                className="rounded-[10px] border-2 border-gray-600 transition h-10 px-3 py-2 text-sm w-full bg-transparent disabled:hover:border-subtle disabled:cursor-not-allowed focus:border-[white] outline-none"
                                type="email"
                                name="email"
                                required
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                onClick={()=>handleLogin}
                            />
                        </div>
                        <div className="mt-2">
                            <label
                            className="text-emphasis mb-2 block text-sm font-medium leading-none"
                            htmlFor="«r11»"
                            >
                            Password
                            </label>
                            <input
                                placeholder="***********"
                                autoComplete="password"
                                className="rounded-[10px] border-2 border-gray-600 transition h-10 px-3 py-2 text-sm w-full bg-transparent focus:border-[white] outline-none"
                                type="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            
                        </div>
                        <button
                            type="submit"
                            className="inline-flex justify-center disabled:cursor-not-allowed items-center rounded-md bg-indigo-500 px-4 py-2 disabled:opacity-25 text-sm leading-6 font-semibold text-white transition duration-150 ease-in-out hover:bg-indigo-400"
                            disabled={isPending}
                            >
                            {isPending? <svg
                                className="mr-3 -ml-1 size-5 animate-spin text-white"
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
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg> :<></>}
                                Sign in to account
                        </button>
                    </form>
                </div>
                <div className="mt-10 flex h-full flex-col justify-end pb-6 text-xs">
                    <div className="flex flex-col text-sm">
                    <div className="flex gap-1">
                        <p className="text-subtle">Don&apos;t have an account?</p>
                        <a className="text-emphasis hover:underline" href="/soup">
                        Sign up
                        </a>
                    </div>
                    <div className="text-subtle">
                        By proceeding, you agree to our{" "}
                        <a
                        className="text-emphasis hover:underline"
                        target="_blank"
                        href="https://cal.com/terms"
                        >
                        Terms
                        </a>{" "}
                        and{" "}
                        <a
                        className="text-emphasis hover:underline"
                        target="_blank"
                        href="https://cal.com/privacy"
                        >
                        Privacy Policy
                        </a>
                        .
                    </div>
                    </div>
                </div>
                </div>
        </div>
        </div>
    );
}
