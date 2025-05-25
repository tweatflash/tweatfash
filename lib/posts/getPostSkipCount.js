import axios from "@/app/api/axios/axios"
export default async function getPostSkipCount(skipCount,postsRoute,bd,bc) {
  
  try {
      const request =await axios.post(`/posts/${postsRoute}`,{
        signedCookies:JSON.stringify({
          refreshToken: bd,
          accessToken:bc
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
