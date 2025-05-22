import axios from 'axios'
const base_Url="https://tweatflash-web-app.onrender.com/api/v1"
export default axios.create({
    baseURL: base_Url,
    headers:{
        "Accept":'*/*',
        "Content-Type":'application/json',
        
    },
    withCredentials: true
    
})