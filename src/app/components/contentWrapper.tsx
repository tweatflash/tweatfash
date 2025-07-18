"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/Authcontext'
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
    const [aspectRatio,setAspectRatio]=useState<{aspect:number,width:number,height:number}>({"aspect":0,"width":0,"height":0})
    const {imageSlider,
          setImageSlider,
          sliderObject,
          mobile,
          setSliderObject}:any=useContext(AuthContext)
    const getAspectRatio = (element: {type:string,url:string}) => {
        if (element.type==="image"){
            const img: any = new Image();
            img.src = element.url;

            img.onload = () => {
                var hgh = img.naturalWidth / img.naturalHeight;
                
                setAspectRatio({"aspect":hgh,"width":img.naturalWidth,"height":img.naturalHeight});
            };
        }else{
            const video = document.createElement('video');
            video.src = element.url // 'element' is your File object
            video.preload = 'metadata';

            video.onloadedmetadata = () => {
                const videoWidth = video.videoWidth;
                const videoHeight = video.videoHeight;

                const aspectratio = videoWidth / videoHeight;
                setAspectRatio({"aspect":aspectratio,"width":videoWidth,"height":videoHeight});
            };
        }
    }  
    useEffect(()=>{
        if(total.length ) {
            if(total[0].url?.endsWith('.mp4') || total[0].url?.endsWith('.webm')){
                getAspectRatio({type:"video",url:total[0].url})
            }else{
                getAspectRatio({type:"image",url:total[0].url})
            }
        }
    },[total])
    return (
       total.length > 0 ?(
            total.length ===1? 
                <div className="block relative w-full cursor-wait" onClick={(e) => {e.stopPropagation();}}>
                        <div
                            draggable="false"
                            tabIndex={2}
                            className={` h-full flex  object-cover bg-center bg-cover overflow-hidden rounded-xl relative  border-solid`}
                            style={{
                                // 
                                paddingBottom:`${(aspectRatio.height / aspectRatio.width)  * 100 >98.55 && !mobile ?98.55 :(aspectRatio.height / aspectRatio.width)  * 100 >133 && mobile?133 : (aspectRatio.height / aspectRatio.width)  * 100}%`,
                                // width: aspectRatio.width,
                                height:"auto",
                                
                                       
                            }}
                        >
                               
                         {/* {
                                total[0].url?.endsWith('.mp4') || total[0].url?.endsWith('.webm') ?
                                    <div className='w-full h-full relative '>
                                        <video src={total[0].url} className='invisible1 object-cover object-center w-full h-full sm:max-h-[450px] max-h-[410px] min-h-full '/> 
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
                                    <img src={total[0].url} className={`invisible1 max-h-[410px] sm:max-h-[450px] max-w-full  min-w-64  object-cover object-center w-auto h-auto ` } />
                        }  */}
                        </div>
                        <div className='absolute max-w-full xs:w-full bg-[hsl(var(--accent))] object-cover bg-center bg-cover bg-no-repeat rounded-xl top-0 border border-[hsl(var(--border-color))]'
                            style={{
                                aspectRatio: aspectRatio.aspect, 
                                height:(aspectRatio.height / aspectRatio.width)  * 100 >130 && !mobile ? "512.5px": (aspectRatio.height / aspectRatio.width)  * 100 >130 && mobile ?"100%":"100%",
                                backgroundImage:
                                    total[0].url && (total[0].url.endsWith('.mp4') || total[0].url.endsWith('.webm'))
                                        ? `url('${total[0].url}')`:
                                        `url('${total[0].url}')`,
                                width:(aspectRatio.height / aspectRatio.width)  * 100 >130 && !mobile ? "380px": (aspectRatio.height / aspectRatio.width)  * 100 >130 && mobile ?"100%":"auto"
                            }}
                        >

                        </div>
                    
                </div>
                :
                <div className='w-full aspect-[1.6/1] flex relative overflow-hidden' onClick={(e) => {e.stopPropagation();}}>
                 <div className='size-full relative overflow-hidden '>
                    <div className={`grid h-full grid-cols-2 gap-[2px] img-gallery`}>
                         {total.slice(0,4).map((file ,index)=>(
                             <div className={`gallery-cnt relative rounded-md border border-[hsl(var(--border-color))] bg-[hsl(var(--accent))] overflow-hidden ${total.length===3 ? "first:row-start-1 first:row-end-[span_2]" :""}`} key={index}>
                                {
                                    file.url.endsWith('.mp4') || file.url.endsWith('.webm') ?
                                        <div className='w-full h-full relative '>
                                            <video src={file.url} className='invisible1 object-cover object-center w-full h-full max-h-full min-h-full '/> 
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
                                        <img src={file.url} className='invisible1 object-cover object-center w-full h-full max-h-full min-h-full ' />
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
