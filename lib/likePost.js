import Cookies from "js-cookie";
import axios from "../src/app/api/axios/axios";
export default async function likePost(postId) {
    const refreshToken=Cookies.get("RFTFL")
    const accessToken=Cookies.get("ACTFL")
    try {
        const request =await axios.post(`posts/like/${postId}`,{
            signedCookies:JSON.stringify({
                refreshToken,accessToken
            }),
        })
        const response=await request
        if(response.data.refreshTokenJWT && response.data.accessTokenJWT) {
            Cookies.set("RFTFL", response.data.refreshTokenJWT, { expires: 7 });
            Cookies.set("ACTFL", response.data.accessTokenJWT, { expires: 7 });
        }
    } catch (error) {
        return undefined
    }
    
}