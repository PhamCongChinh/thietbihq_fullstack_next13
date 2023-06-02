'use client'

import { SUCCESS, fetcher } from "@/helpers/constants"
import Link from "next/link"
import { useState } from "react"
import useSWR from 'swr'

import { useSearchParams } from 'next/navigation'
import api from "@/config/axiosconfig"
import { ToastContainer, toast } from "react-toastify"

const Categories = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get("page")

    // Modal
    const [showCreate, setShowCreate] = useState(false)
    const [showUpdate, setShowUpdate] = useState({status: false, slug: ''})
    const [showDelete, setShowDelete] = useState({status: false, id: ''})

    const { data: getCategories, error: errorCategories, isLoading: isLoadingCategories, mutate: mutateCategories } = useSWR(`/api/categories`, fetcher)//?page=${search}
    const { data: category, error: errorCategory, isLoading: isLoadingCategory} = useSWR(`/api/categories/${showUpdate.slug}`, fetcher)

    if (errorCategories || errorCategory) return <div>Lỗi tải trang</div>
    if (isLoadingCategories || isLoadingCategory) return <div>Đang tải...</div>

    // Xử lý tạo mới
    const handleCreate = async (e: any) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", e.target.name.value)
        formData.append("slug", e.target.slug.value)

        return await api.post(`/api/categories`, formData)
        .then((res: { data: { status: string; ecode: string } }) => {
            if (res.data.status == "0" && res.data.ecode == "00") {
                toast("Thêm thành công", { hideProgressBar: true, autoClose: 2000, type: 'success' })
                mutateCategories()
                setShowCreate(false)
            }else{
                toast("Thêm không thành công", { hideProgressBar: true, autoClose: 2000, type: 'error' })
                setShowCreate(false)
            }
        })
    }

    const handleUpdate = async (e: any) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("id", e.target.id.value)
        formData.append("name", e.target.name.value)
        formData.append("slug", e.target.slug.value)
        
        return await api.put(`/api/categories/${e.target.id.value}`, formData)
        .then(res => {
            if (res.data.status == "0" && res.data.ecode == "00") {
                toast("Sua thành công", { hideProgressBar: true, autoClose: 2000, type: 'success' })
                mutateCategories()
                setShowUpdate({status: false, slug: ''})
            }else{
                toast("Sua không thành công", { hideProgressBar: true, autoClose: 2000, type: 'error' })
                setShowUpdate({status: false, slug: ''})
            }
        })
    }
    
    const handleDelete = async (id: string) => {
        return await api.delete(`/api/categories/${id}`)
        .then(res => {
            if (res.data.status == "0" && res.data.ecode == "00") {
                toast("Xoa thành công", { hideProgressBar: true, autoClose: 2000, type: 'success' })
                mutateCategories()
                setShowDelete({status: false, id: ''})
            }else{
                toast("Xoa không thành công", { hideProgressBar: true, autoClose: 2000, type: 'error' })
                setShowDelete({status: false, id: ''})
            }
        })
    }

    return (
        <div>
            <ToastContainer/>
            <button onClick={() => {setShowCreate(!showCreate)}}>Tạo mới</button>

            {showCreate ? (
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-4 border-b rounded-t">
                                <button onClick={e => setShowCreate(false)}>x</button>
                            </div>
                            <form onSubmit={handleCreate}>
                                <div className="relative mb-6">
                                    <label htmlFor="">Chuyên mục</label>
                                    <input type="text" name="name" className="border-2" required/>
                                </div>
                                <div className="relative mb-6">
                                    <label htmlFor="">Slug</label>
                                    <input type="text" name="slug" className="border-2" required/>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button type="button" className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={e => setShowCreate(false)}>Hủy</button>
                                    <button type="submit" className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Gửi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={e => setShowCreate(false)}></div>
                </>
            ):('')}

            {showUpdate.status ? (
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <button onClick={e => setShowUpdate({status: false, slug: ''})} className="cursor-pointer">X</button>
                            <form onSubmit={handleUpdate}>
                                <div>
                                    <label htmlFor="">Id</label>
                                    <input type="text" defaultValue={category[0].id} name='id' disabled/>
                                </div>
                                <div>
                                    <label htmlFor="">Name</label>
                                    <input type="text" defaultValue={category[0].name} name='name'/>
                                </div>
                                <div>
                                    <label htmlFor="">Slug</label>
                                    <input type="text" defaultValue={category[0].slug} name='slug'/>
                                </div>
                                <div>
                                    <button type='submit'>Send</button>
                                </div>
                                <button type="submit">Send</button>
                            </form>
                            
                            <button onClick={e => setShowUpdate({status: false, slug: ''})} className="cursor-pointer">Cencal</button>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ):('')}

            {showDelete.status ? (
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <button onClick={e => setShowDelete({status: false, id: ''})} className="cursor-pointer">X</button>
                        <button onClick={() => handleDelete(showDelete.id)} className="cursor-pointer">OK</button>
                        <button onClick={e => setShowDelete({status: false, id: ''})} className="cursor-pointer">Cencal</button>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={e => setShowCreate(false)}></div>
                </>
            ):('')}

            <table className="w-full text-left text-gray-500">
                <thead className="text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">T</th>
                        <th scope="col" className="px-6 py-3">S</th>
                        <th scope="col" className="px-6 py-3">S</th>
                        <th scope="col" className="px-6 py-3">X</th>
                    </tr>
                </thead>
                <tbody>
                    {getCategories.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td><button onClick={() => setShowUpdate({status: true, slug: item.slug})} className="cursor-pointer">Sửa</button></td>
                            <td><button onClick={() => setShowDelete({status: true, id: item.id})} className="cursor-pointer">Xóa</button></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    )
}

export default Categories