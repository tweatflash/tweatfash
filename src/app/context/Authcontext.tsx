import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import checkLoggedinStatus from "../../../lib/checkLoggedinStatus.js";
type ckn={
  refreshTkn:string,
  accessTkn:string
}
export const AuthContext = createContext({});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userObj,setUserObj]=useState(
    
  )
  const [auth,setAuth]=useState(false)
  const [authLoader,setAuthLoader] =useState(true)
  const [forYou,setForYou]=useState<HomeFeed[] | null>([
//     {
//     "repostsCount": [
//         0
//     ],
//     "flaggedCount": [
//         0
//     ],
//     "taggedFriendsCount": [
//         0
//     ],
//     "commentCount": 0,
//     "replyCount": 0,
//     "_id": "686a507c21193d7829c59e14",
//     "user": {
//         "_id": "67e270548d038a2bda9559d7",
//         "name": "Hidde Douna",
//         "username": "micheal",
//         "profileImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1750237208/profile-images/tmp-2-1750237208285_upbgns.jpg",
//         "coverImage": "",
//         "pricingPlanDuration": null
//     },
//     "type": null,
//     "pollId": [],
//     "text": "Hmmmmmmm",
//     "img": [
//         {
//             "url": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1751797883/Post-images/tmp-5-1751797883457_ybjlqt.jpg",
//             "width": 263,
//             "height": 264,
//             "aspectRatio": 0.9962121212121212,
//             "_id": "686a507c21193d7829c59e15"
//         }
//     ],
//     "video": [],
//     "audio": [],
//     "likes": [
//         {
//             "_id": "67446b0122518e366eddac3c",
//             "name": "Scott Stillman",
//             "username": "tweatflash",
//             "profileImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1748032875/profile-images/tmp-2-1748032874844_zho7vu.jpg",
//             "coverImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1742580852/cover-images/tmp-7-1742580852008_itg61t.jpg"
//         }
//     ],
//     "views": [],
//     "visibility": "2025-07-06T09:19:27.734Z",
//     "promotedDuration": null,
//     "tweatstars": 0,
//     "createdAt": "2025-07-06T10:31:24.404Z",
//     "updatedAt": "2025-07-09T18:57:32.578Z",
//     "reposts": [],
//     "quotes": [],
//     "flagged": [],
//     "taggedFriends": [],
//     "impressions": null
// },
// {
//     "repostsCount": [
//         0
//     ],
//     "flaggedCount": [
//         0
//     ],
//     "taggedFriendsCount": [
//         0
//     ],
//     "commentCount": 0,
//     "replyCount": 0,
//     "_id": "687112cdb96bf1a51a9dfa17",
//     "user": {
//         "_id": "6795e8f72bf1cdc26b48632c",
//         "name": "Hogeon",
//         "username": "Xlemson",
//         "profileImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1751123859/profile-images/tmp-2-1751123859309_nkx0iz.jpg",
//         "coverImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1751462467/cover-images/tmp-3-1751462466453_miyuqh.jpg",
//         "pricingPlanDuration": null
//     },
//     "type": null,
//     "pollId": [],
//     "text": "The best cure to overcome doubt is to just do it.",
//     "img": [
//         {
//             "url": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1752240845/Post-images/tmp-2-1752240844083_edbcr5.jpg",
//             "width": 1080,
//             "height": 1350,
//             "aspectRatio": 0.8,
//             "_id": "687112cdb96bf1a51a9dfa18"
//         }
//     ],
//     "video": [],
//     "audio": [],
//     "likes": [],
//     "views": [],
//     "visibility": "2025-07-11T12:37:23.497Z",
//     "promotedDuration": null,
//     "tweatstars": 0,
//     "createdAt": "2025-07-11T13:34:05.905Z",
//     "updatedAt": "2025-07-11T13:34:05.905Z",
//     "reposts": [],
//     "quotes": [],
//     "flagged": [],
//     "taggedFriends": [],
//     "impressions": null
// },
// {
//     "repostsCount": [
//         0
//     ],
//     "flaggedCount": [
//         0
//     ],
//     "taggedFriendsCount": [
//         0
//     ],
//     "commentCount": 0,
//     "replyCount": 0,
//     "_id": "68682e882fad7bc64c832334",
//     "user": {
//         "_id": "67e270548d038a2bda9559d7",
//         "name": "Hidde Douna",
//         "username": "micheal",
//         "profileImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1750237208/profile-images/tmp-2-1750237208285_upbgns.jpg",
//         "coverImage": "",
//         "pricingPlanDuration": null
//     },
//     "type": null,
//     "pollId": [],
//     "text": "Gooday everyone \r\n\r\nIf you are seeing this post it means our servers are working",
//     "img": [],
//     "video": [],
//     "audio": [],
//     "likes": [
//         {
//             "_id": "676c5283083771ba1f822c2c",
//             "name": "Isaac wooden",
//             "username": "augustine_godwin3d76",
//             "profileImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1750268373/profile-images/tmp-2-1750268372651_y1i9iy.jpg",
//             "coverImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1740735231/cover-images/tmp-7-1740735230779_xo2nxp.jpg"
//         }
//     ],
//     "views": [],
//     "visibility": "2025-07-04T19:23:01.159Z",
//     "promotedDuration": null,
//     "tweatstars": 0,
//     "createdAt": "2025-07-04T19:42:00.198Z",
//     "updatedAt": "2025-07-11T13:06:09.225Z",
//     "reposts": [],
//     "quotes": [],
//     "flagged": [],
//     "taggedFriends": [],
//     "impressions": null,
    
// },
// {
//     "repostsCount": [
//         0
//     ],
//     "flaggedCount": [
//         0
//     ],
//     "taggedFriendsCount": [
//         0
//     ],
//     "commentCount": 0,
//     "replyCount": 0,
//     "_id": "68706aecb4fa6fac0076e3d5",
//     "user": {
//         "_id": "67446b0122518e366eddac3c",
//         "name": "Scott Stillman",
//         "username": "tweatflash",
//         "profileImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1748032875/profile-images/tmp-2-1748032874844_zho7vu.jpg",
//         "coverImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1742580852/cover-images/tmp-7-1742580852008_itg61t.jpg",
//         "pricingPlanDuration": "2054-11-26T00:17:55.237Z"
//     },
//     "type": null,
//     "pollId": [],
//     "text": null,
//     "img": [
//         {
//             "url": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1752197864/Post-images/tmp-3-1752197863242_akukvi.jpg",
//             "width": 3024,
//             "height": 4032,
//             "aspectRatio": 0.75,
//             "_id": "68706aecb4fa6fac0076e3d6"
//         },
//         {
//             "url": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1752197866/Post-images/tmp-5-1752197863555_voswvu.jpg",
//             "width": 3024,
//             "height": 4032,
//             "aspectRatio": 0.75,
//             "_id": "68706aecb4fa6fac0076e3d7"
//         }
//     ],
//     "video": [],
//     "audio": [],
//     "likes": [
//         {
//             "_id": "67446b0122518e366eddac3c",
//             "name": "Scott Stillman",
//             "username": "tweatflash",
//             "profileImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1748032875/profile-images/tmp-2-1748032874844_zho7vu.jpg",
//             "coverImage": "https://res.cloudinary.com/dlsngc9fb/image/upload/v1742580852/cover-images/tmp-7-1742580852008_itg61t.jpg"
//         }
//     ],
//     "views": [],
//     "visibility": "2025-07-11T01:16:57.006Z",
//     "promotedDuration": null,
//     "tweatstars": 0,
//     "createdAt": "2025-07-11T01:37:48.301Z",
//     "updatedAt": "2025-07-11T01:37:56.680Z",
//     "reposts": [],
//     "quotes": [],
//     "flagged": [],
//     "taggedFriends": [],
//     "impressions": null
// },

  ])
  const [cook,setCook]=useState({refreshTkn:"",accessTkn:""})
  const [following,setFollowing]=useState<HomeFeed[] | null>([])
  const [openSearch,setOpenSearch]=useState<boolean>(false)
  const [post,setPost]=useState<boolean>(false)
  const [mobile, setmobile] = useState(false);
  const [imgMob,setImgMob]=useState(false);
  useEffect(() => {
    setmobile(window.innerWidth <= 650 ? true : false);
    setImgMob(window.innerWidth <= 650 ? true : false);
  }, []);
  const [loggedIn,setLoggedIn]=useState({"loding":true,"loggedIn" :false})
  const [authError,setAuthError]=useState({
    "show":false,
    "error":""
  })
  const [imageSlider,setImageSlider]=useState(false)
  const [sliderObject,setSliderObject]=useState({
    images:[],
    initialIndex:0,
    postAuthor:"",
    postContent:""
  })
  const [visible, setVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [editProfile,setEditProfile]=useState(false)
  const [openImage,setOpenImage]=useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [commentOpen,setCommentOpen]=useState<boolean>(false)
  const [commentFeed,setCommentFeed]=useState<HomeFeed>()
  const [commentRoute,setCommentRoute]=useState("")
  const openMenu = (element:any) => {
    const rect = element.getBoundingClientRect();
    setAnchorEl(element);
    setPosition({

      top: rect.top + window.scrollY + 30,
      left: rect.left + window.scrollX - 220
    });
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      if (visible && anchorEl) {
        openMenu(anchorEl); // Recalculate position
      }
      setmobile(window.innerWidth <= 650 ? true :false)
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [visible, anchorEl]);

  
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
          if(data?.valid){
            setLoggedIn({"loding":false,"loggedIn":true})
          }else{
             setLoggedIn({"loding":false,"loggedIn":false})
          }
          
        }
        fire()
       }
      setLoggedIn({"loding":false,"loggedIn":false})
    }else{
      setLoggedIn({"loding":false,"loggedIn":false})
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
          setPost,
          visible,
          setVisible,
          onClose,
          position,
          setPosition,
          anchorEl, setAnchorEl,
          openMenu,
          mobile,
          setLoggedIn,
          loggedIn,
          openImage,
          setOpenImage,
          editProfile,
          setEditProfile,
          isMobileOpen, 
          setIsMobileOpen,
          commentOpen,
          setCommentOpen,
          commentFeed,
          setCommentFeed,
          imageSlider,
          setImageSlider,
          sliderObject,
          setSliderObject,
          commentRoute,
          setCommentRoute
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};
