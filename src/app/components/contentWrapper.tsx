"use Client"
import React, { useEffect, useRef, useState } from 'react'
type param={
    aspectRatio:number
    height:number
    url:string
    width:number
    _id:string
}
type img={
    param:param[]
}

export default function ContentWrapper({param}:img) {
    let imgLength:number=0
    let totalLength:number=0
    param.length===1 && {

    }
    
    if(Array.isArray(param) && param.length ){
        param.forEach(item=>{
            const img = new Image();
            img.src =item.url
            img.onload=()=>{
                const { naturalWidth, naturalHeight } = img;
                // console.log(naturalWidth/naturalHeight)
                const aspectRatio1:number = naturalWidth / naturalHeight;
                item.aspectRatio=aspectRatio1
            }
        })
    }

    return (
        <>
            {
                <div className="flex overflow-hidden relative w-full">
                    <div draggable="false" className={`classnammm bg-[hsl(var(--accent))] rounded-xl border border-dashed border-[hsl(var(--border-color))]`}>
                        <img src={param[0].url}  />
                    </div>
                </div>
            }
        </>
    )
}
