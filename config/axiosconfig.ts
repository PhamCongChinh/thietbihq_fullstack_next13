import axios from "axios"

const api = axios.create({
    timeout: 10000,
    headers:{
        "Content-Type": ["application/json", "multipart/form-data"],
    }
})

export default api