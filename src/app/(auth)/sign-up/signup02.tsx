"use client"
import React, {FormEvent} from 'react'
type Prop ={
    email:string
}
export default function Signup02({email}:Prop) {
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
    }; 
    return (
        <div className="flex flex-1 items-center justify-center text-[--color]">
                <div className="w-full max-w-[480px]">
                    <form className="flex flex-col gap-6" method="POST" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-[22px] mobile:text-[26px] font-bold w-full text-black dark:text-white">We sent you a code</h1>
                        <p className="text-muted-foreground text-sm mobile:text-[16px] text-balance text-[#727272]" >
                            Enter the code we sent below to verify tweatflash@gmail.co.
                        </p>
                    </div>
                    <div className="mt-6 space-y-2">
                        <p className="text-subtle text-xs font-medium">Step 4 of 5</p>
                        <div
                            data-testid="step-indicator-container"
                            className="flex w-full space-x-2 rtl:space-x-reverse"
                        >
                            
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
                            className="dark:bg-white bg-black h-1 w-full rounded-[1px]"
                            data-testid="step-indicator-0"
                            />
                            <div
                            className="bg-[hsl(var(--accent))] h-1 w-full rounded-[1px] opacity-25 dark:opacity-100"
                            data-testid="step-indicator-4"
                            />
                        </div>
                    </div>
                    <div className="grid gap-6">
                        <label htmlFor="sign-up-code" className="relative rounded-xl border-2 bg-[rgba(225,225,225,.051)] dark:border-transparent border-[hsl(var(--border-color))] has-[input:focus]:border-[#4070f4] has-[input:focus]:bg-[hsl(var(--background))] px-[20px] py-[10px] flex flex-col gap-1">
                            <div className="flex justify-between text-[12px] dark:text-white w-full">
                                <p className='text-[#727272]'>Verification code</p>
                                {/* <Link href={""}>Forgot password</Link> */}
                            </div>
                            <input
                                type="text"
                                id="sign-up-code" 
                                name="text" 
                                placeholder="******"
                                className="w-full h-6 bg-transparent border-none outline-none text-sm  text-[--color]"
                            
                                aria-describedby="uidnote"
                                autoComplete="on"
                            />
                            <span className="absolute h-5 bottom-[-20px] pt-2 right-0 text-sm ">Didnt recieve the code ?</span>
                        
                        </label>
                        
                        <button
                        data-slot="button"
                        className="w-full px-6 py-2 mt-3 flex justify-center bg-black text-white rounded-lg outline-none dark:bg-[#E5E5E5] dark:text-black"
                        type="submit"
                        >
                            Continiue
                            
                        </button>
                        
                    
                    </div>
                    
                    <div className="text-center text-sm">
                    having a problem with the email?{/* */}{" "}
                    <a href="#" className="underline underline-offset-4">
                    use Phone
                    </a>
                    </div>
                    </form>
                </div>
            </div>
    )
}
