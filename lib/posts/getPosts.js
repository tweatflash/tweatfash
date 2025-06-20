import axios from "@/app/api/axios/axios"
import Cookies from "js-cookie";
export default async function getPosts(postsId,postsRoute,bd,bc) {
  const rf=Cookies.get("RFTFL")
  const ac=Cookies.get("ACTFL")

  try {
      const request =await axios.post(`/${postsRoute}`,{
        signedCookies:JSON.stringify({
          refreshToken: rf,
          accessToken: ac
      }),
        Ids:postsId
      })
      const response=await request
      return response.data
    
  } catch (error) {
    console.log(error)
    return undefined
  }
}
