'use client'

import axios from "axios";
import { useState } from "react";

const Upload = () => {
    const [image, setImage] = useState<any | null>(null);
    const [createObjectURL, setCreateObjectURL] = useState<any | null>(null);
    const uploadToClient = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]
            setImage(file);
            setCreateObjectURL(URL.createObjectURL(file));
        }
    }
    const handle = async (e:any) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("image", image, image.name)
        console.log(image)
        const response = await axios.post('/api/upload', formData)
        console.log(response)
        return response.data
    }
    return (
        <form onSubmit={handle}>
            <input type="file" name="image" onChange={uploadToClient}/>
            <button type="submit">Send</button>
        </form>
    )
}
export default Upload