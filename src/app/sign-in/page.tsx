"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useState,FormEvent } from "react"

export default  function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword] =useState("")
    const router=useRouter()
    const handleLogin= async (e:FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      if (email && password){
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
    return (
      <>
    
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6"  onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Example@gmail.com"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border-1 border-gray-200 placeholder:text-gray-400 focus:border-1  focus:border-indigo-600 sm:text-sm/6 dark:bg-[#09090b] dark:text-white dark:border-gray-600 dark:placeholder-gray-500 dark:focus:border-indigo-600 dark:placeholder:text-gray-500"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-white">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border-1 border-gray-200 placeholder:text-gray-400 focus:border-1  focus:border-indigo-600 sm:text-sm/6 dark:bg-[#09090b] dark:text-white dark:border-gray-600 dark:placeholder-gray-500 dark:focus:border-indigo-600 dark:placeholder:text-gray-500"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  