import axios from "@/app/api/axios/axios"
import Cookies from "js-cookie";
export default async function getPostSkipCount(skipCount,postsRoute,bd,bc) {
  const rf=Cookies.get("RFTFL")
  const ac=Cookies.get("ACTFL")
  try {
      const request =await axios.post(`/posts/${postsRoute}`,{
        signedCookies:JSON.stringify({
          refreshToken: rf,
          accessToken: ac
      }),
        skipCount: skipCount
      })
      const response=await request
      return response.data
    
  } catch (error) {
    console.log(error)
    return undefined
  }
}
