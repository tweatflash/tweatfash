"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useState,FormEvent, useContext } from "react"
import { useGoogleLogin } from '@react-oauth/google';
import Link from "next/link";
import { AuthContext } from "@/app/context/Authcontext";
export default function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword] =useState("")
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const [validEmail,setValidEmail]=useState(emailRegex.test(email))
    const [googleObj,setGoogleObj]=useState({})
    const { authError,setAuthError} :any=useContext(AuthContext)
        const closeError=()=>{
          setAuthError({
            "show":false,
            "error":""
          })
        }
    useEffect(()=>{
        setValidEmail(emailRegex.test(email))
    },[email])
    const [isPending,setIsPending]=useState(false)
    const router=useRouter()
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
            setIsPending(true)
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
        },
        onError:()=>{
            setIsPending(false)
        }
    });
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true)
        if (!emailRegex.test(email)){
            setValidEmail(false)
            setAuthError({
                "show":true,
                "error":"Please enter a valid email"
            })
        }
        try { 
            const request = await fetch("https://tweatflash-web-app.onrender.com/api/v1/auth/login/",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({
                    "email":email,
                    "password":password
                }) 
            })
            const response=await request
            
            setIsPending(false)
            const data =await response.json()
             if (response.status===200){
                Cookies.set("RFTFL", data.refreshTokenJWT, { expires: 7 });
                Cookies.set("ACTFL", data.accessTokenJWT, { expires: 7 });
                window.location.reload()
            }
            response?.status===500? setAuthError({
                "show":true,
                "error":data.msg
            }):(response?.status===400?setAuthError({
                "show":true,
                "error":data.msg
            }) :setAuthError({
                "show":false,
                "error":""
            }))
        } catch (error) {
            setIsPending(false)
            setAuthError({
                "show":true,
                "error":"An Unexpected error occured possibly your network "
            })
            console.log(error)                                                                                  
        }
    }; 
    return (
    
        <div className="flex flex-1 items-center justify-center dark:text-white text-black">
        <div className="w-full max-w-[480px]">
            <form className="flex flex-col gap-6" method="POST" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-[22px] mobile:text-[26px] font-bold w-full text-black dark:text-white">Automate your meeting notes</h1>
                <p className="text-muted-foreground text-sm mobile:text-[16px] text-balance text-[#727272]" >
                    Transcribe, summarize, search, and analyze all your voice conversations.
                </p>
            </div>
            <div className="grid gap-6">
                <label htmlFor="sign-in-email" className="rounded-xl bg-[rgba(0,0,0,.07)] dark:bg-[rgba(225,225,225,.051)] border border-transparent has-[input:focus]:border-[#4070f4] has-[input:focus]:bg-[hsl(var(--background))] px-[20px] py-[10px] flex flex-col gap-1">
                    <p className='text-[12px] text-[#727272]'>Email</p>
                    <input
                        type="email"
                        id="sign-in-email" 
                        name="email" 
                        value={email}
                        className="w-full h-6 bg-transparent border-none outline-none text-sm dark:text-white text-black"
                        onChange ={(e)=> setEmail(e.target.value)}
                        placeholder="example@gmail.co"
                        aria-describedby="uidnote"
                        autoComplete="on"
                    />
                
                </label>
                <label htmlFor="sign-in-password" className="relative rounded-xl border bg-[rgba(0,0,0,.07)] dark:bg-[rgba(225,225,225,.051)] border-transparent has-[input:focus]:border-[#4070f4] has-[input:focus]:bg-[hsl(var(--background))] px-[20px] py-[10px] flex flex-col gap-1">
                    <div className="flex justify-between text-[12px] dark:text-white w-full">
                        <p className='text-[#727272]'>Password</p>
                        {/* <Link href={""}>Forgot password</Link> */}
                    </div>
                    <input
                        type="password"
                        id="sign-in-password" 
                        name="password" 
                        placeholder="**********"
                        className="w-full h-6 bg-transparent border-none outline-none text-sm text-black dark:text-white"
                        onChange ={(e)=> setPassword(e.target.value)}
                        aria-describedby="uidnote"
                        autoComplete="on"
                        value={password}
                    />
                    <span className="absolute h-5 bottom-[-20px] pt-2 right-0 text-sm ">Forgot Password ?</span>
                
                </label>
                
                
                <button
                    data-slot="button"
                    className={`w-full px-6 mt-3 py-2 ${validEmail===false || password.length==0 || isPending ? "opacity-40 pointer-events-none cursor-not-allowed" :""} flex justify-center bg-black text-white rounded-lg outline-none dark:bg-[#E5E5E5] dark:text-black`}
                    disabled={validEmail===false || password.length==0 || isPending? true :false}
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
                    </svg>: "login"
                    }
                </button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-[hsl(var(--background))] text-muted-foreground relative z-10 px-2">
                    Or continue with
                </span>
                </div>
               
            </div>
             
            </form>
                <button
                    data-slot="button"
                    className="inline-flex my-3 items-center justify-between gap-4 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:cursor-not-allowed hover:opacity-70 disabled:opacity-40 [&_svg]:pointer-events-none [&img:not([class*='size-'])]:size-4 shrink-0 [&img]:shrink-0 outline-none shadow-xs hover:bg-[accent]  px-6 py-4  w-full bg-gray-900 text-white dark:bg-[rgba(225,225,225,.051)] text-[16px] tracking-wide"
                    onClick={()=>{
                        login()
                        setIsPending(true)
                    }}
                    disabled={isPending}
                >
                    <img src="/google.svg" className="size-6" alt="google"/>
                    <span className="flex w-full dark:text-white ">Continue with Google</span>
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
                Don't have an account?
                <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
                </Link>
            </div>
        </div>
            
        </div>

    )
}
