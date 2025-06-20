import axios from "../src/app/api/axios/axios";
import Cookies from "js-cookie";
export default async function getEachCommunity(communityId) {
    const rf=Cookies.get("RFTFL")
    const ac=Cookies.get("ACTFL")
    try {
        const request = await axios.post(`/community/profile/${communityId}`,{
            signedCookies:JSON.stringify({
                refreshToken: rf,
                accessToken:ac
            })
        })
        const response =await request
        if (response.data) return response.data
        return undefined
    } catch (error) {
        return undefined
    }
}
 