import axios from "axios"

export default async function getUserProfile(username) {
    
    try {
        const request = await axios.post(`https://tweatflash-web-app.onrender.com/api/v1/users/profile/${username}`,{
            signedCookies:JSON.stringify({
                refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InRva2VuVXNlciI6eyJfaWQiOiI2NzQ0NmIwMTIyNTE4ZTM2NmVkZGFjM2MifX0sImlhdCI6MTc0OTIwODI1Mn0.ivBpYVD1PFNg1N_l2KmFXPVA77-Fg95-6qCmYXI7Wo0",
                accessToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InRva2VuVXNlciI6eyJfaWQiOiI2NzQ0NmIwMTIyNTE4ZTM2NmVkZGFjM2MifSwicmVmcmVzaFRva2VuIjoiZjc3Y2QyNzQ2OTgyM2U0YTEyMTcyNzE3OGUxM2E0M2Y4NWY3MGVmNzFjNTc4OWU1Y2VjYzIxZDgyMmM1MDczY2RhMzAzOWQ2NWY2YTYzNzgifSwiaWF0IjoxNzQ5MjA4MjUyfQ.Fh4UEiK1BiKwvJwV8uUIwqe6bExYRDJMq1GKkjqsKbw"
            })
        })
        const response =await request
        return response.data
    } catch (error) {
        return undefined
    }
}
 