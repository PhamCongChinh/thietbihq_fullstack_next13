'use client'
import { fetcher } from "@/helpers/constants"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Image from 'next/image'
import axios from "axios"
import api from "@/config/axiosconfig"
import { ToastContainer, toast } from "react-toastify"

type Data = {
    id: string,
    id_category: string,
    name: string,
    slug: string,
    image: string,
    code: string,
    image_list:string,
    price:string,
    content:string,
    discount:string,
    view:string,
}

let Category: Data = {
    id: "",
    id_category: "",
    name: "",
    slug: "",
    code: "",
    image: "",
    image_list: "",
    price: "",
    content:"",
    discount: "",
    view: "",
}

const Products = () => {

    const [showCreate, setShowCreate] = useState(false)
    const [showUpdate, setShowUpdate] = useState({status: false, data: Category})
    const [showDelete, setShowDelete] = useState({status: false, slug: ''})

    const [select, setSelect] = useState('')

    const [image, setImage] = useState<any | null>(null);
    const [createObjectURL, setCreateObjectURL] = useState<any | null>(null);
    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image)
        }
    }, [image])

    // Get category id
    const {data: categories, error: errorCategories, isLoading: isLoadingCategories} = useSWR(`/api/categories`, fetcher)
    const {data: products, error: errorProducts, isLoading: isLoadingProducts, mutate: mutateProducts} = useSWR(`/api/products`, fetcher)
    console.log(products)
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
        formData.append('id_category', select)
        formData.append('name', e.target.name.value)
        formData.append('slug', e.target.slug.value)
        formData.append('code', e.target.code.value)
        formData.append('image', image)
        formData.append('image_list', e.target.image_list.value)
        formData.append('price', e.target.price.value)
        formData.append('content', e.target.content.value)
        formData.append('discount', e.target.discount.value)
        formData.append('view', e.target.view.value)

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

    const updateSubmit = async (e: any) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('id', e.target.id.value)
        formData.append('id_category', e.target.id_category.value)
        formData.append('name', e.target.name.value)
        formData.append('slug', e.target.slug.value)
        formData.append('code', e.target.code.value)
        formData.append('image', image)
        formData.append('image_name', showUpdate.data.image)
        formData.append('image_list', e.target.image_list.value)
        formData.append('price', e.target.price.value)
        formData.append('content', e.target.content.value)
        formData.append('discount', e.target.discount.value)
        formData.append('view', e.target.view.value)

        return await api.put(`/api/products`, formData, {
            headers: {"Content-Type": "multipart/form-data"}
        })
        .then(res => {
            if (res.data.status == "0" && res.data.ecode == "00") {
                toast("Sửa thành công", { hideProgressBar: true, autoClose: 2000, type: 'success' })
                mutateProducts()
                setShowUpdate({status: false, data: Category})
                setSelect('')
            }else{
                toast("Sửa không thành công", { hideProgressBar: true, autoClose: 2000, type: 'error' })
                setShowUpdate({status: false, data: Category})
                setSelect('')
            }
        })
    }

    const deleteSubmit = async (slug: string) => {
        console.log(slug)
        return await api.delete(`/api/products/${slug}`)
        .then(res => {
            if (res.data.status == "0" && res.data.ecode == "00") {
                toast("Xoa thành công", { hideProgressBar: true, autoClose: 2000, type: 'success' })
                mutateProducts()
                setShowDelete({status: false, slug: ''})
            }else{
                toast("Xoa không thành công", { hideProgressBar: true, autoClose: 2000, type: 'error' })
                setShowDelete({status: false, slug: ''})
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
                                                <label htmlFor="">Category</label>
                                                <select name="id_category" value={select} onChange={handleOnChangeCategoryId}>
                                                    <option value={''} >Vui long cho chu chuyen muc</option>
                                                    {categories?.map((item: any) => {
                                                        return(
                                                            <option value={`${item.id}`} key={item.id}>{item.name}</option>
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
                                                <label htmlFor="">Code</label>
                                                <input type="text" name="code" className="border"/>
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
                                                <label htmlFor="">Image List</label>
                                                <input type="text" name="image_list" className="border"/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Price</label>
                                                <input type="number" name="price" className="border"/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Content</label>
                                                <textarea name="content" className="border" cols={50} rows={4}/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">Discount</label>
                                                <input type="number" name="discount" className="border"/>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <label htmlFor="">View</label>
                                                <input type="number" name="view" className="border"/>
                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className="mt-2">Send</button>
                                    </div>
                                </form>
                                <button className="mt-2" onClick={() => {setShowCreate(false); setImage(null)}}>CENCAL</button>
                            </div>
                        
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={e => {setShowCreate(false); setImage(null)}}></div>
                </>
            : 
                <></>
            }

            {/**Update */}
            {showUpdate.status ? (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <button className="mt-2" onClick={() => {setShowUpdate({status: false, data: Category}); setImage(null)}}>CENCAL</button>
                            <hr />
                            <form onSubmit={updateSubmit}>
                                <div className="grid grid-cols-2">
                                    <label htmlFor="">ID</label>
                                    <input type="text" defaultValue={showUpdate.data.id} name="id" disabled/>
                                </div>
                                <div className="grid grid-cols-2">
                                    <label htmlFor="">Id_category</label>
                                    <select name="id_category" value={select} onChange={handleOnChangeCategoryId}>
                                        <option value={showUpdate.data.id_category}>{showUpdate.data.id_category} - Chuyên mục hiện tại</option>
                                        {categories?.map((item: any) => {
                                            return(
                                                <option value={`${item.id}`} key={item.id}>{item.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2">
                                    <label htmlFor="">Name</label>
                                    <input type="text" defaultValue={showUpdate.data.name} name="name" />
                                </div>
                                <div className="grid grid-cols-2">
                                    <label htmlFor="">Slug</label>
                                    <input type="text" defaultValue={showUpdate.data.slug} name="slug"/>
                                </div>
                                <div className="grid grid-cols-2">
                                    <label htmlFor="">Code</label>
                                    <input type="text" defaultValue={showUpdate.data.code} name="code"/>
                                </div>
                                <div className="grid grid-cols-2">
                                    <label htmlFor="">Image</label>
                                    <input type="file" onChange={uploadToClient}/>
                                </div>
                                {image ? (
                                    <Image src={createObjectURL} alt="234234" width={100} height={100}/>
                                ):(
                                    <span>Select</span>
                                )}
                                <div>Image hiện tại</div>
                                <div>
                                    <Image src={`/images/products/${showUpdate.data.image}`} alt="asd" height={100} width={100}/>
                                </div>

                                <div className="grid grid-cols-2">
                                    <label htmlFor="">Image List</label>
                                    <input type="text" defaultValue={showUpdate.data.image_list} name="image_list" />
                                </div>
                                <div className="grid grid-cols-2">
                                    <label htmlFor="">Price</label>
                                    <input type="text" defaultValue={showUpdate.data.price} name="price"/>
                                </div>
                                <div className="grid grid-cols-2">
                                    <label htmlFor="">Content</label>
                                    <input type="text" defaultValue={showUpdate.data.content} name="content"/>
                                </div>
                                <div className="grid grid-cols-2">
                                    <label htmlFor="">Discount</label>
                                    <input type="text" defaultValue={showUpdate.data.discount} name="discount"/>
                                </div>
                                <div className="grid grid-cols-2">
                                    <label htmlFor="">View</label>
                                    <input type="text" defaultValue={showUpdate.data.view} name="view"/>
                                </div>
                                <div className="">
                                    <button type="submit" className="mt-2">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ):<></>}

            {showDelete.status ? (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-4 border-b rounded-t">
                                <button onClick={() => setShowDelete({status: false, slug: ''})}>x</button>
                            </div>
                            <div>
                                <button onClick={() => deleteSubmit(showDelete.slug)} className="p-6">OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            ):<></>}

            <div>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Category</td>
                            <td>Tên</td>
                            <td>Slug</td>
                            <td>Hình ảnh</td>
                            <td>Danh sách ảnh</td>
                            <td>Đơn giá</td>
                            <td>Số lượng</td>
                            <td>Lượt xem</td>
                            <td>Ngày tạo</td>
                            <td>Ngày sửa</td>
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
                                    <td><Image src={`/images/products/${item.image}`} alt="asd" height={100} width={100}/></td>
                                    <td>{item.image_list}</td>
                                    <td>{item.price}</td>
                                    <td>{item.discount}</td>
                                    <td>{item.view}</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.updatedAt}</td>
                                    <td><button onClick={() => setShowUpdate({status: true, data: {
                                        id: item.id,
                                        id_category: item.id_category,
                                        name: item.name,
                                        slug: item.slug,
                                        code: item.code,
                                        image: item.image,
                                        image_list: item.image_list,
                                        price: item.price,
                                        content: item.content,
                                        discount: item.discount,
                                        view: item.view
                                    }})}>edit</button></td>
                                    <td><button onClick={() => setShowDelete({status: true, slug: item.slug})}>delete</button></td>
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