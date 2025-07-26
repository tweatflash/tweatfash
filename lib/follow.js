import Cookies from "js-cookie";
import axios from "../src/app/api/axios/axios";
export default async function quickAction({type,data}) {
    const refreshToken=Cookies.get("RFTFL")
    const accessToken=Cookies.get("ACTFL")
    let url = "";

    if (type === "follow") {
        url = `users/follow/${data}`;
    } else if (type === "repost") {
        url = `posts/repost/${data}`;
    }else if (type==="delete"){
        url=`posts/delete/${data}`
    }

    try {
        const request =await axios.post(url,{
            signedCookies:JSON.stringify({
                refreshToken,accessToken
            }),
        })
        const response=await request
        if(response.data.refreshTokenJWT && response.data.accessTokenJWT) {
            Cookies.set("RFTFL", response.data.refreshTokenJWT, { expires: 7 });
            Cookies.set("ACTFL", response.data.accessTokenJWT, { expires: 7 });
        }
        return response
    } catch (error) {
        return error
    }
    
}