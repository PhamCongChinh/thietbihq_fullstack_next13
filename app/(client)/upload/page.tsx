'use client'

import axios from "axios";
import { useState } from "react";
import Image from 'next/image'

const Upload = () => {
    const [image, setImage] = useState<any | null>(null);
    const [createObjectURL, setCreateObjectURL] = useState<any | null>(null);

    const [imageList, setImageList] = useState<any | null>(null)

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
        formData.append("image", image)
        console.log("image", image)

        const response = await axios.post('/api/upload', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        //console.log(response)
    }

    const uploadToClient1 = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]
            console.log(event.target.files.length)
            setImage(file);
            setCreateObjectURL(URL.createObjectURL(file));
        }
    }

    const multi = async (e: any) => {
        e.preventDefault()
        
        
    }

    return (
        <>
        <form onSubmit={handle}>
            <input type="file" name="image" onChange={uploadToClient}/>
            <button type="submit">Send</button>
        </form>
        <div><span>------------------------Multi------------------------</span></div>
        <form onSubmit={multi} encType='multipart/form-data'>
            <input type="file" name="multiImage" onChange={uploadToClient1} multiple/>
            <button type="submit">Send</button>
        </form>
        <div>
            {image ? (
                <Image src={createObjectURL} alt="234234" width={250} height={250}/>
            ) : (
                <span>Select Image</span>
            )}
        </div>
        </>
    )
}
export default Upload