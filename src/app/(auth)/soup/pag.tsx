"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useState,FormEvent } from "react"
import { useGoogleLogin } from '@react-oauth/google';
import Link from "next/link";
export default function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword] =useState("")
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const [emailError,setEmailerror]=useState({
        "isValid":false,
        "emailError":""
    })
    const [isPending,setIsPending]=useState(false)
    const router=useRouter()
    const handleLogin= async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if (email && password){
        const request= await fetch(`https://tweatflash-web-app.onrender.com/api/v1/auth/login`,{
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
    const checkValidAuth= async ()=>{
        try { 
            const request = await fetch("https://tweatflash-web-app.onrender.com/api/v1/auth/emailAndphoneNumberAuth",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({
                    "email":email
                }) 
            })
            const response=await request
            console.log(response)
        } catch (error) {
            console.log(error)
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
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!emailRegex.test(email)){
            setEmailerror({
                "isValid":false,
                "emailError":"Please enter a valid email"
            })
        }
        try { 
            const request = await fetch("https://tweatflash-web-app.onrender.com/api/v1/auth/emailAndphoneNumberAuth",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({
                    "email":email
                }) 
            })
            const response=await request
            console.log(response.status)
            response?.status===200? setEmailerror({
                "isValid":false,
                "emailError":"These credentials do not match our records."
            }):(response?.status===400?setEmailerror({
                "isValid":true,
                "emailError":""
            }) :setEmailerror({
                "isValid":false,
                "emailError":"An Unexpected error occured"
            }))
        } catch (error) {
            console.log(error)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        }
    }; 
    return (
       <div className="light !text-white bg-muted 2xl:bg-default flex min-h-screen w-full flex-col items-center justify-center [--cal-brand:#111827] dark:[--cal-brand:#FFFFFF] [--cal-brand-subtle:#9CA3AF] [--cal-brand-text:#FFFFFF] dark:[--cal-brand-text:#000000] [--cal-brand-emphasis:#101010] dark:[--cal-brand-emphasis:#e1e1e1]">
        <div className="bg-muted 2xl:border-subtle grid w-full max-w-[1440px] grid-cols-1 grid-rows-1 overflow-hidden lg:grid-cols-1 2xl:rounded-[20px] 2xl:border 2xl:py-6">
            <div className="ml-auto mr-auto mt-0 flex w-full max-w-xl flex-col px-4 pt-6 sm:px-16 md:px-20 lg:mt-24 2xl:px-28">
            <div className="flex w-fit lg:-mt-12">
                <button
                    className="group whitespace-nowrap font-medium relative disabled:cursor-not-allowed gap-1 text-[#727272] border border-transparent enabled:hover:bg-[hsl(var(--accent))] enabled:hover:text-emphasis enabled:hover:border-subtle hover:border disabled:opacity-30 focus-visible:bg-subtle focus-visible:outline-none focus-visible:ring-0 focus-visible:border-subtle focus-visible:shadow-button-outline-gray-focused enabled:active:shadow-outline-gray-active transition-shadow duration-200 text-sm leading-none hover:bg-subtle todesktop:mt-10 mb-6 flex h-6 max-h-6 w-full items-center rounded-md px-3 py-2"
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
                <h1 className="font-[boldCal] text-[28px] leading-none ">
                Create your tweatflash.com account
                </h1>
                <p className="text-[#727272] font-bold text-base  leading-5">
                Free for individuals. Team plans for collaborative features.
                </p>
            </div>
            <div className="mt-6 space-y-2">
                <p className="text-subtle text-xs font-medium">Step 1 of 5</p>
                <div
                    data-testid="step-indicator-container"
                    className="flex w-full space-x-2 rtl:space-x-reverse"
                >
                    <div
                    className="bg-white h-1 w-full rounded-[1px]"
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

            <div className="mt-12">
                <form className="flex flex-col gap-4" data-gtm-form-interact-id={0}>
                <div>
                    <div className="">
                    <label
                        className="text-white mb-2 block text-sm font-medium leading-none"
                        
                    >
                        Username
                    </label>
                    <div
                        dir="ltr"
                        className="rounded-[10px] border font-normal bg-default border-default text-default placeholder:text-muted hover:border-emphasis focus:ring-0 focus:shadow-outline-gray-focused disabled:bg-subtle disabled:hover:border-default disabled:cursor-not-allowed shadow-outline-gray-rested transition h-10 px-3 py-2 text-sm group relative mb-1 flex min-w-0 items-center gap-1 [&:focus-within]:border-subtle [&:focus-within]:ring-brand-default [&:focus-within]:ring-2 [&:has(:disabled)]:bg-subtle [&:has(:disabled)]:hover:border-default [&:has(:disabled)]:cursor-not-allowed"
                    >
                        <div className="flex flex-shrink-0 items-center justify-center whitespace-nowrap">
                        <span className="text-sm font-medium leading-none text-muted peer-disabled:opacity-50">
                            cal.com/
                        </span>
                        </div>
                        <input
                            data-testid="signup-usernamefield"
                            id="«r10»"
                            placeholder=""
                            className="w-full min-w-0 truncate border-0 bg-transparent focus:outline-none focus:ring-0 text-default rounded-lg text-sm font-medium leading-none placeholder:text-muted disabled:cursor-not-allowed disabled:bg-transparent pl-0.5 pr-0"
                            name="username"
                        />
                    </div>
                    </div>
                    <div className="text-gray text-default flex items-center text-sm">
                    <div className="text-sm " />
                    </div>
                </div>
                <div className="">
                    <label
                    className="text-emphasis mb-2 block text-sm font-medium leading-none"
                    htmlFor="«r11»"
                    >
                    Email
                    </label>
                    <input
                        id="signup-email"
                        placeholder=""
                        autoComplete="email"
                        data-testid="signup-emailfield"
                        className="rounded-[10px] border font-normal bg-default border-default text-default placeholder:text-muted hover:border-emphasis focus:ring-0 focus:shadow-outline-gray-focused shadow-outline-gray-rested transition h-10 px-3 py-2 text-sm w-full bg-transparent disabled:hover:border-subtle disabled:cursor-not-allowed"
                        type="email"
                        name="email"
                    />
                </div>
                <div>
                    
                </div>
                <div className="block items-center sm:flex">
                    <div className="w-full">
                    <div className="hover:bg-subtle relative flex w-fit items-center rounded-md p-1">
                        <label className="relative flex items-start text-emphasis">
                        <div className="flex h-5 items-center">
                            <input
                            data-testid="signup-cookie-content-checkbox"
                            id="radix-«r12»"
                            className="text-emphasis focus:ring-emphasis dark:text-muted border-default bg-default focus:bg-default active:bg-default h-4 w-4 rounded transition checked:hover:bg-gray-600 focus:outline-none focus:ring-0 ltr:mr-2 rtl:ml-2 hover:bg-subtle hover:border-emphasis checked:bg-gray-800"
                            type="checkbox"
                            data-gtm-form-interact-field-id={0}
                            />
                        </div>
                        <span className="text-default ml-2 text-sm font-medium">
                            I agree to the privacy policy and cookie usage
                        </span>
                        </label>
                    </div>
                    </div>
                </div>
                <button
                    data-testid="saml-submit-button"
                    className="group whitespace-nowrap inline-flex items-center font-medium relative disabled:cursor-not-allowed gap-1 bg-brand-default text-brand enabled:hover:bg-brand-emphasis focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-button-solid-brand-focused border border-brand-default disabled:opacity-30 shadow-button-solid-brand-default enabled:active:shadow-button-solid-brand-active enabled:hover:shadow-button-solid-brand-hover transition-transform duration-100 px-2.5 py-2 text-sm leading-none my-2 w-full justify-center rounded-md text-center"
                    type="button"
                >
                    <div className="contents visible group-active:translate-y-[0.5px]">
                    <svg
                        height={16}
                        width={16}
                        className="fill-transparent mr-2 h-5 w-5"
                        aria-hidden="true"
                    >
                        <use href="#shield-check" />
                    </svg>
                    Create Account
                    </div>
                </button>
                </form>
            </div>
            <div className="mt-10 flex h-full flex-col justify-end pb-6 text-xs">
                <div className="flex flex-col text-sm">
                <div className="flex gap-1">
                    <p className="text-subtle">Already have an account?</p>
                    <a className="text-emphasis hover:underline" href="/auth/login">
                    Sign in
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
        <section
            aria-label="Notifications alt+T"
            tabIndex={-1}
            aria-live="polite"
            aria-relevant="additions text"
            aria-atomic="false"
        />
        </div>


    )
}
