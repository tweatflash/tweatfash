import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import checkLoggedinStatus from "../../../lib/checkLoggedinStatus.js";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userObj,setUserObj]=useState({})
  const [auth,setAuth]=useState(false)
  const [authLoader,setAuthLoader] =useState(true)
  useEffect(()=>{
    if(document.cookie.includes("RFTFL")){
       const rf:string | undefined=Cookies.get("RFTFL")
       const ac:string| undefined=Cookies.get("ACTFL")
       if (typeof(ac)!==undefined && typeof(rf)!==undefined){
        const fire=async ()=>{
          const data= await checkLoggedinStatus(rf,ac)
          setUserObj(data?.request)
          setAuthLoader(false)
        }
        fire()
       }
       
    }
  },[])
  return (
    <AuthContext.Provider value={{userObj,auth,setAuth,authLoader,setAuthLoader}}>
      {children}
    </AuthContext.Provider>
  );
};
