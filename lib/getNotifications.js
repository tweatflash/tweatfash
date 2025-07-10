import Cookies from "js-cookie";
import axios from "../src/app/api/axios/axios";
export default async function getNotification(skipCount) {
    const refreshToken=Cookies.get("RFTFL")
    const accessToken=Cookies.get("ACTFL")
    try {
        const request =await axios.post(`/notifications`,{
            signedCookies:JSON.stringify({
                refreshToken,accessToken
            }),
            skipCount
        })
        const response=await request
        const data=await response.data
        return data
    } catch (error) {
        return undefined
    }
    
}