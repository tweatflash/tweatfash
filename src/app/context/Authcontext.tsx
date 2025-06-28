import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import checkLoggedinStatus from "../../../lib/checkLoggedinStatus.js";
type ckn={
  refreshTkn:string,
  accessTkn:string
}
export const AuthContext = createContext({});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userObj,setUserObj]=useState({})
  const [auth,setAuth]=useState(false)
  const [authLoader,setAuthLoader] =useState(true)
  const [forYou,setForYou]=useState<HomeFeed[] | null>([])
  const [cook,setCook]=useState({refreshTkn:"",accessTkn:""})
  const [following,setFollowing]=useState<HomeFeed[] | null>([])
  const [openSearch,setOpenSearch]=useState<boolean>(false)
  const [post,setPost]=useState<boolean>(false)
  const [authError,setAuthError]=useState({
    "show":false,
    "error":""
  })
  useEffect(()=>{
    if(document.cookie.includes("RFTFL")){
       const rf:string | undefined=Cookies.get("RFTFL")
       const ac:string| undefined=Cookies.get("ACTFL")
       setCook({
        refreshTkn:rf ?rf :"",
        accessTkn:ac ? ac :"" 
       })
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
    <AuthContext.Provider 
      value={
        {
          userObj,
          auth,
          setAuth,
          authLoader,
          setAuthLoader,
          cook,
          forYou,
          setForYou,
          following,
          setFollowing,
          authError,
          setAuthError,
          openSearch,
          setOpenSearch,
          post,
          setPost
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};
