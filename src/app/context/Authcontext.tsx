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
  const [forYou,setForYou]=useState<HomeFeed[] | null>([])
  const [toast, setToast] = useState({
    "valid":false,
    "msg":"",
    "isFunction":"",
    "function":null,
  });
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
  const [menuList,setMenuList]=useState([])
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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);
  return (
    <AuthContext.Provider 
      value={
        {
          userObj,
          setUserObj,
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
          setCommentRoute,
          toast, setToast,
          menuList,setMenuList,
          isVisible,setIsVisible
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};
