import axios from "@/app/api/axios/axios"
export default async function getPosts(postsId,postsRoute,bd,bc) {
  
  try {
      const request =await axios.post(`/posts/${postsRoute}`,{
        signedCookies:JSON.stringify({
          refreshToken: bd,
          accessToken:bc
        }),
        Ids:[]
      })
      const response=await request
      return response.data
    
  } catch (error) {
    console.log(error)
    return undefined
  }
}
