import axios from "axios"

const api = axios.create({
    //baseURL: 'http://localhost:3000/api',
    timeout: 5000,
    headers:{
        "Content-Type": ["application/json", "multipart/form-data"],
    },
    withCredentials: true, // Để request gửi kèm cookie
})

api.interceptors.request.use(
    async config => {
        console.log("AXIOS REQUEST")
        config.headers["Authorization"] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGluaHBjIiwiZXhwIjoxNjg3NDU0NTc5LCJpYXQiOjE2ODc0NTQ1NDl9.BqRAK0kIxRBtQSK28S2rQ6FRfyS23GVAmSYmCJUs8a0'
        return config
    },
    error => {
        Promise.reject(error)
    }
)
api.interceptors.response.use(
    response => {
        console.log("AXIOS RESPONSE")
        console.log(response.status)
        return response
    },
    async (error) => {
        console.log(error.response.status)
    }
)


export default api