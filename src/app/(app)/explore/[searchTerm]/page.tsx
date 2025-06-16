
import ClientPage from "./clientPage";
// import { FormEvent, useEffect, useState } from "react";
type Props = {
  params: {
    searchTerm: string;
  };
};
export  function generateMetadata({ params: { searchTerm } }: Props) {
    const displayTerm = searchTerm.replace("%20", " ");
    return {
        title:`Search "${displayTerm}" on Tweatflash` 
        
    };
}
export default function SearchCompartment({ params: { searchTerm } }: Props) {
    
    return (
        <div className="w-full h-auto"> 
            <div className="flex flex-col justify-center relative">
                <div className="flex justify-center"> 
                
                    <ClientPage searchTerm={searchTerm}/>
                </div>
            </div>
        </div>
        // <>
        //     
           
        // </>
    )
}
