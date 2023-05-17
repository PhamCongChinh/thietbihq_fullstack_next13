'use client'
import { fetcher } from "@/helpers/constants"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Image from 'next/image'
import axios from "axios"

const Products = () => {
    const [show, setShow] = useState(false)
    const [select, setSelect] = useState("")

    const [image, setImage] = useState<any | null>(null);
    const [createObjectURL, setCreateObjectURL] = useState<any | null>(null);

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image)
        }
    }, [image])

    // Get category id
    const {data, error, isLoading} = useSWR(`/api/categories/getCategories`, fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    // Show or hidden modal create
    const handleCreate = () => {
        setShow(!show)
    }

    const handleOnChangeCategoryId = (e: any) => {
        setSelect(e.target.value)
    } 

    const uploadToClient = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]
            setImage(file);
            setCreateObjectURL(URL.createObjectURL(file));
        }
    }

    const confirm = async (e: any) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('id', e.target.id.value)
        formData.append('categoryId', select)
        formData.append('name', e.target.name.value)
        formData.append('slug', e.target.slug.value)
        formData.append('image', image)
        formData.append('imageLink', image)
        formData.append('price', e.target.price.value)
        formData.append('content', e.target.content.value)
        formData.append('discount', e.target.discount.value)
        formData.append('created', e.target.created.value)
        formData.append('updated', e.target.updated.value)
        formData.append('view', e.target.view.value)
        formData.append('status', e.target.status.value)
        console.log(formData)
        const response = await axios.post(`http://localhost:3000/api/products`, formData)
        /*const response = await fetch(`http://localhost:3000/api/products`, {
            method: 'POST',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })*/
        console.log(response)

        /*const data = {
            id: e.target.id.value,
            categoryId: select,
            name: e.target.name.value,
            slug: e.target.slug.value,
            imageFile: file,
            imageLink: fileName
        }*/
        //console.log(data)

        /*const res = await fetch(`http://localhost:3000/api/products`, {
            method: 'POST',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
              },
        })*/
        //console.log('client:', res)
        
    }
    
    return(
        <div>
            <button onClick={handleCreate}>Modal</button>
            {show ? 
                <div className="fixed top-0 left-0 right-0 bottom-0 z-50 w-full bg-gray-50 opacity-75">
                    <div className="flex items-center justify-center h-full">
                        <div className="bg-white rounded-lg shadow">
                            <div className="flex justify-between p-4">
                                <form onSubmit={confirm} encType="multipart/form-data">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Id</label>
                                                <input type="text" name="id" className="border" disabled/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Category</label>
                                                <select name="categoryId" value={select} onChange={handleOnChangeCategoryId}>
                                                    <option value={''} >Vui long cho chu chuyen muc</option>
                                                    {data?.map((item: any) => {
                                                        return(
                                                            <option value={item.name} key={item.id}>{item.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Name</label>
                                                <input type="text" name="name" className="border"/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Slug</label>
                                                <input type="text" name="slug" className="border"/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Image</label>
                                                <input type="file" name="image" onChange={uploadToClient} className="border"/>
                                            </div>
                                            <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                                                {image ? (
                                                    <Image src={createObjectURL} alt="234234" width={500} height={500}/>
                                                ) : (
                                                    <span>Select Image</span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Image Link</label>
                                                <input type="text" name="imageLink" className="border"/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Image Link List</label>
                                                <input type="text" name="imageLinkList" className="border"/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Price</label>
                                                <input type="number" name="price" className="border"/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Content</label>
                                                <input type="text" name="content" className="border"/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Discount</label>
                                                <input type="number" name="discount" className="border"/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Created</label>
                                                <input type="date" name="created" className="border"/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Updated</label>
                                                <input type="date" name="updated" className="border"/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">View</label>
                                                <input type="number" name="view" className="border"/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Status</label>
                                                <input type="text" name="status" className="border"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className="mt-2">Send</button>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
            : 
                <></>
            }
        </div>
    )
}

export default Products