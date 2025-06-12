import axios from "@/app/api/axios/axios"
import Cookies from "js-cookie";
export default async function getSinglePost(postId) {
  const rf=Cookies.get("RFTFL")
  const ac=Cookies.get("ACTFL")

  try {
      const request =await axios.post(`posts/singlePost/${postId}`,{
        signedCookies:JSON.stringify({
          refreshToken: rf,
          accessToken: ac
        })
      })
      const response=await request
      return response.data
    
  } catch (error) {
    console.log(error)
    return undefined
  }
}
