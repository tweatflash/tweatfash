import React from 'react'
import CommentSkeleton from './comment/CommentSkeleton'
import Person from './person'
export default function PeoplePage({person}:{person:Person[]}) {
    const petch=()=>{
        console.log("jhj")
    }
    return (
        <div className="flex flex-col">              
                {person.map((item:Person,index:number)=><div className='hover:bg-[hsl(var(--accent))] cursor-pointer mobile:rounded-lg' key={index}><Person userObj={item}/></div>)}
                <CommentSkeleton onVisible={() => petch()}/>
            </div> 
    )
}
