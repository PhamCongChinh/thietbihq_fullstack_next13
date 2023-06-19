import axios from "axios"

const api = axios.create({
    //baseURL: 'http://localhost:3000/api',
    timeout: 5000,
    headers:{
        "Content-Type": ["application/json", "multipart/form-data"],
    }
})

/*api.interceptors.request.use(
    async config => {
        return config
    },
    error => {
        Promise.reject(error)
    }
)*/

export default api