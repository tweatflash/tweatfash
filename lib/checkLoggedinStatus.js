import axios from "../src/app/api/axios/axios";
export default async function checkLoggedinStatus(rf,ac) {

  try {
    let refreshToken=""
    let accessToken=""
    
    const response = await axios.post("/auth",{
        signedCookies:JSON.stringify({
          refreshToken:rf,
          accessToken:ac
        })
    });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    const request =await response.data
    if (request.user){
      return {
        valid:true,
        request
      }
    }
  } catch (error) {
      return undefined
  }
    
}

