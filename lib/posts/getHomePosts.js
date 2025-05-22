import axios from "@/app/api/axios/axios"
export default async function getHomePosts(postsId,bd,bc) {
  
  try {
      const request =await axios.post("/posts/all",{
        signedCookies:JSON.stringify({
          refreshToken: bd,
          accessToken:bc
        }),
        Ids:[]
      })
      const response=await request
      
      console.log(response.data)
      return response.data
    
  } catch (error) {
    console.log(error)
    return undefined
  }
}
