import Cookies from "js-cookie";
import axios from "../src/app/api/axios/axios";
export default async function likePost(data,accessToken,refreshToken) {
    const refreshToken=Cookies.get("RFTFL")
    const accessToken=Cookies.get("ACTFL")
    try {
        const request =await axios.post(`posts/like/${data}`,{
            signedCookies:JSON.stringify({
                refreshToken,accessToken
            }),
           
        })
        const response=await request
        if (response.data.refreshTokenJWT && response.data.accessTokenJWT){
            setAllowCookies(true)
            setCook(response.data.refreshTokenJWT)
            setCookies2(response.data.accessTokenJWT)
        }
        return response.data
    } catch (error) {
        return undefined
    }
    
}