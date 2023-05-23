'use client'
import { fetcher } from "@/helpers/constants"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Image from 'next/image'
import axios from "axios"
import api from "@/config/axiosconfig"
import { ToastContainer, toast } from "react-toastify"

const Products = () => {

    const [showCreate, setShowCreate] = useState(false)

    const [select, setSelect] = useState("")

    const [image, setImage] = useState<any | null>(null);
    const [createObjectURL, setCreateObjectURL] = useState<any | null>(null);
    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image)
        }
    }, [image])

    // Get category id
    const {data: categories, error: errorCategories, isLoading: isLoadingCategories} = useSWR(`/api/categories/getCategories`, fetcher)
    const {data: products, error: errorProducts, isLoading: isLoadingProducts, mutate: mutateProducts} = useSWR(`/api/products`, fetcher)
    console.log(categories)
    if (errorCategories || errorProducts) return <div>failed to load</div>
    if (isLoadingCategories || isLoadingProducts) return <div>loading...</div>

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
        formData.append('imageLink', e.target.imageLinkList.value)
        formData.append('content', e.target.content.value)

        return await api.post(`/api/products`, formData, {
            headers: {"Content-Type": "multipart/form-data"}
        })
        .then(res => {
            if (res.data.status == "0" && res.data.ecode == "00") {
                toast("Thêm thành công", { hideProgressBar: true, autoClose: 2000, type: 'success' })
                mutateProducts()
                setShowCreate(false)
            }else{
                toast("Thêm không thành công", { hideProgressBar: true, autoClose: 2000, type: 'error' })
                setShowCreate(false)
            }
        })
        
    }
    
    return(
        <div>
            <ToastContainer/>
            <button onClick={() => setShowCreate(!showCreate)}>Create</button>

            {showCreate ? 
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        
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
                                                    {categories?.map((item: any) => {
                                                        return(
                                                            <option value={item.id} key={item.id}>{item.name}</option>
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
                                                <label htmlFor="">Content</label>
                                                <textarea name="content" className="border" cols={50} rows={4}/>
                                            </div>
                                         
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className="mt-2">Send</button>
                                    </div>
                                </form>
                                <button className="mt-2" onClick={() => {setShowCreate(false)}}>CENCAL</button>
                            </div>
                        
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={e => setShowCreate(false)}></div>
                </>
            : 
                <></>
            }




            <div>
                <table>
                    <thead>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((item: any) => {
                            return(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.id_category}</td>
                                    <td>{item.name}</td>
                                    <td>{item.slug}</td>
                                    <td>{item.image}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Products