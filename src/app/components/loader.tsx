import { Info } from 'lucide-react'
import React from 'react'
type Prop={
  loading:boolean,
  error:{
    name:string,
    description:string
  }
}
export default function Loader({loading,error}:Prop) {
  return (
    <div className='flex justify-center relative h-screen flex-col items-center transition-all'>
        
        <img
          className="size-20 md:size-24 overflow-hidden z-30   rounded-full"
          alt="tweatflash logo"
          title="tweatflash"
          src="/tweatflash.svg"
        />
        {
          error.name && <div className="relative flex items-start text-[--color] gap-3 p-4 border rounded-lg backdrop-blur-2xl bg-[hsl(var(--accent))] border-[hsl(var(--border-color))] mt-5 mx-4">
          {/* <div className="w-5 h-5 shrink-0 i-ph:info text-bolt-ds-brand" /> */}
          <Info size={20} color='#4070f4'/>
          <div className="flex w-full gap-2">
            <div className="flex flex-col w-full gap-1 items-start">
              <span className="text-sm ">
                {error.name}
              </span>
              <div className="text-[#727272] text-sm">
                {error.description}
              </div>
            </div>
            <div className="flex gap-2 empty:hidden items-start">
              <button
                className="flex items-center justify-center font-medium shrink-0 min-w-0 max-w-full rounded-md focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed gap-1 text-xs px-2 h-7 focus-visible:outline-bolt-ds-brandHighlight bg-black/5 dark:bg-white/5 [&:hover:where(:not(:disabled))]:bg-bolt-ds-inverseSurface/15 text-bolt-ds-textPrimary"
                type="button"
                data-state="closed"
              >
                <span className="truncate">Try again</span>
              </button>
            </div>
          </div>
        </div>
        }

        {loading && <div className='absolute bottom-10'>
            <div className="dot-pulse z-10"></div>
        </div>
        }
            
          
    </div>
  )
}
