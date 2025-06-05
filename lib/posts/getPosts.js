import axios from "@/app/api/axios/axios"

export default async function getPosts(postsId,postsRoute,bd,bc) {
  
  try {
      const request =await axios.post(`/posts/${postsRoute}`,{
        signedCookies:JSON.stringify({
          refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InRva2VuVXNlciI6eyJfaWQiOiI2NzZjNTI4MzA4Mzc3MWJhMWY4MjJjMmMifSwicmVmcmVzaFRva2VuIjoiNjY0MGM4M2EwZWNmYzVkZGQ1YTNhMzhjNGZiOTQ1MjZmMzU4OTViYzg1YTk0NWMxYTMyMTI0MmJmYWE5Y2Q2NmExNWIzMDljOWUwMjU1NmQifSwiaWF0IjoxNzQ4NzAxNDcwfQ.maELL6pX5oShxYYamGSK0TfFYXHrMQ_yf_LpG8QQMgA",
          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InRva2VuVXNlciI6eyJfaWQiOiI2NzZjNTI4MzA4Mzc3MWJhMWY4MjJjMmMifX0sImlhdCI6MTc0ODcwMTQ3MH0.CksWZGyvuEJy4IIqb9olJSFPB0422lnmMMipoXQKEjI"
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
