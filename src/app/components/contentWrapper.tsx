"use client"
import React, { useEffect, useRef, useState } from 'react'
type Img={
    aspectRatio:string
    height:number
    width:number
    url:string
    _id:string
}
type Prop={
    param:HomeFeed | SinglePost
}

export default function ContentWrapper({param}:Prop) {
    const [img,setImg]=useState<Img[] | []>(param.img ? param.img : [])
    const [video,setVideo]=useState<Img[] | []>(param.video ? param.video : [])
    const [total,setTotal]=useState<Img[]>([...img,...video])
    useEffect(()=>{
        
    },[img,video])
    useEffect(() => {

      

    }, [param])
    return (
       total.length > 0 ?(
            total.length ===1? 
                <div className="block overflow-hidden w-full cursor-wait">
                          <div draggable="false" tabIndex={2} className={`cursor-not-allowed flex bg-[hsl(var(--accent))] object-cover bg-center w-fit bg-cover  h-auto overflow-hidden min-w-20 rounded-xl relative border border-[hsl(var(--border-color))] border-solid `}>
                            
                            {
                                total[0].url?.endsWith('.mp4') || total[0].url?.endsWith('.webm') ?
                                    <div className='w-full h-full relative '>
                                        <video src={total[0].url} className='object-cover object-center w-full h-full sm:max-h-[450px] max-h-[410px] min-h-full '/> 
                                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                                <button className='text-[--color] p-3 rounded-full bg-[hsl(var(--accent)/.7)] backdrop-blur-sm border border-[hsl(var(--border-color))] '>
                                                    <svg
                                                        role="img"
                                                        width={14}
                                                        height={14}
                                                        viewBox="0 0 16 16"
                                                        fill="currentColor"
                                                        strokeWidth="1.8"
                                                        stroke="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        aria-label="Play"
                                                        >
                                                        <g>
                                                            <title />
                                                            <path d="M3.35866 16C2.58101 16 2 15.4101 2 14.4447V1.55531C2 0.598883 2.58101 0 3.35866 0C3.75196 0 4.10056 0.134078 4.54749 0.393296L15.1575 6.54302C15.9531 7.00782 16.3106 7.39218 16.3106 8C16.3106 8.61676 15.9531 9.00112 15.1575 9.45698L4.54749 15.6067C4.10056 15.8659 3.75196 16 3.35866 16Z" />
                                                        </g>
                                                        </svg>

                                                </button>
                                            </div>
                                        </div>
                                    :
                                    <img src={total[0].url} className={`max-h-[410px] sm:max-h-[450px] max-w-full  min-w-64  object-cover object-center w-auto h-auto ` } />
                            }
                        </div>
                    
                </div>
                :
                <div className='w-full aspect-[1.6/1] flex relative overflow-hidden'>
                 <div className='size-full relative overflow-hidden '>
                    <div className={`grid h-full grid-cols-2 gap-[2px] img-gallery`}>
                         {total.slice(0,4).map((file ,index)=>(
                             <div className={`gallery-cnt relative rounded-md border border-[hsl(var(--border-color))] bg-[hsl(var(--accent))] overflow-hidden ${total.length===3 ? "first:row-start-1 first:row-end-[span_2]" :""}`} key={index}>
                                {
                                    file.url.endsWith('.mp4') || file.url.endsWith('.webm') ?
                                        <div className='w-full h-full relative '>
                                            <video src={file.url} className='object-cover object-center w-full h-full max-h-full min-h-full '/> 
                                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                                <button className='text-[--color] p-3 rounded-full bg-[hsl(var(--accent)/.7)] backdrop-blur-sm border border-[hsl(var(--border-color))] '>
                                                    <svg
                                                        role="img"
                                                        width={14}
                                                        height={14}
                                                        viewBox="0 0 16 16"
                                                        fill="currentColor"
                                                        strokeWidth="1.8"
                                                        stroke="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        aria-label="Play"
                                                        >
                                                        <g>
                                                            <title />
                                                            <path d="M3.35866 16C2.58101 16 2 15.4101 2 14.4447V1.55531C2 0.598883 2.58101 0 3.35866 0C3.75196 0 4.10056 0.134078 4.54749 0.393296L15.1575 6.54302C15.9531 7.00782 16.3106 7.39218 16.3106 8C16.3106 8.61676 15.9531 9.00112 15.1575 9.45698L4.54749 15.6067C4.10056 15.8659 3.75196 16 3.35866 16Z" />
                                                        </g>
                                                        </svg>

                                                </button>
                                            </div>
                                        </div>
                                        :
                                        <img src={file.url} className=' object-cover object-center w-full h-full max-h-full min-h-full ' />
                                }
                                
                                 {/* {param.img.length >4 && index==3? <div className='overflow-txt'>
                                    <p>+{eval( param.img.length - 4)}</p>
                                 </div> :<></>} */}
                             </div>
                           
                         ))}
                     </div>
                    </div>
                </div>
            ) : 
        <></>
    )
}
