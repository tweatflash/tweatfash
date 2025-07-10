import Cookies from "js-cookie";
import axios from "../src/app/api/axios/axios";
export default async function savePost(postId) {
    const refreshToken=Cookies.get("RFTFL")
    const accessToken=Cookies.get("ACTFL")
    try {
        const request =await axios.post(`/posts/flags/${postId}`,{
            signedCookies:JSON.stringify({
                refreshToken,accessToken
            }),
        })
        const response=await request
        return response
    } catch (error) {
        return undefined
    }
    
}