'use client'

import { SUCCESS, fetcher } from "@/helpers/constants"
import Link from "next/link"
import { useState } from "react"
import useSWR from 'swr'

import { useSearchParams } from 'next/navigation'
import api from "@/config/axiosconfig"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { ToastContainer, toast } from "react-toastify"

export default function Category(){

    const searchParams = useSearchParams()
    const search = searchParams.get("page")

    let itemsPagination = 4

    // Redux
    const message = useSelector((state: RootState) => state.message)
    const dispatch = useDispatch()

    // Modal
    const [showCreate, setShowCreate] = useState(false)
    const [showUpdate, setShowUpdate] = useState({status: false, id: ''})
    const [showDelete, setShowDelete] = useState({status: false, id: ''})
    
    const { data: getCategories, error: errorCategories, isLoading: isLoadingCategories } = useSWR(`/api/categories?page=${search}`, fetcher)
    const { data: getCategory, error: errorCategory, isLoading: isLoadingCategory} = useSWR(`/api/categories/${showUpdate.id}`, fetcher)

    if (errorCategories || errorCategory) return <div>Lỗi tải trang</div>
    if (isLoadingCategories || isLoadingCategory) return <div>Đang tải...</div>

    // Pagination
    const pageCount = Math.ceil(getCategories.totalCategories[0].total/itemsPagination)
    const pagination = (pageCount: number) => {
        let content = []
        for (let index = 1; index <= pageCount; index++) {
            content.push(<li key={index} className="border-2 px-3 py-1 cursor-pointer">
                <Link href={`/dashboard/categories?page=${index}`}>{index}</Link>
            </li>)
        }
        return content
    }

    let prev = Number(search) - 1
    if (prev < 0) {
        prev = 1
    }
    //console.log(search)

    let next = null
    if (search == null) {
        next = Number(search) + 2
    }else{
        next = Number(search) + 1
        if(next > pageCount){
            next = pageCount
        }
    }

    
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
                setShowCreate(false)
            }else{
                toast("Thêm không thành công", { hideProgressBar: true, autoClose: 2000, type: 'error' })
                setShowCreate(false)
            }
        })
    }

    const handleUpdate = async (e: any) => {
        e.preventDefault()
    }
    

    const handleDelete = async (id: string) => {
        return await fetch(`http://localhost:3000/api/categories/${id}`,{
            method: 'DELETE',
        }).then(response => response.json()).then(res => {
            if (res.message == SUCCESS) {
                toast("Thêm thành công", { hideProgressBar: true, autoClose: 2000, type: 'success' })
                setShowDelete({status: false, id: ''})
            }else{
                toast("Xóa không thành công", { hideProgressBar: true, autoClose: 2000, type: 'error' })
                setShowDelete({status: false, id: ''})
            }
        })
    }

    return (
        <div>
            <ToastContainer/>
            <button onClick={() => {setShowCreate(!showCreate)}}>Tạo mới</button>

            {showCreate ? (
                <div className="fixed top-0 left-0 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-full max-w-2xl max-h-full mx-auto">
                        <div className=" bg-white rounded-lg shadow">
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
                                <div className="flex flex-row justify-between">
                                    <button type="submit" className="border-2">Gửi</button>
                                    <button type="button" className="border-2" onClick={e => setShowCreate(false)}>Hủy</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ):('')}

            {showUpdate.status ? (
                <div className="fixed top-0 left-0 z-[60] w-full h-full bg-gray-200 opacity-75 overflow-x-hidden overflow-y-auto">
                <div className="flex flex-col bg-white border shadow-sm rounded-xl sm:max-w-lg m-3 mt-7 items-center justify-center px-6 py-8 mx-auto opacity-100">
                    <button onClick={e => setShowUpdate({status: false, id: ''})} className="cursor-pointer">X</button>
                    <hr />
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label htmlFor="">Id</label>
                            <input type="text" defaultValue={getCategory[0].id} name='id' disabled/>
                        </div>
                        <div>
                            <label htmlFor="">Name</label>
                            <input type="text" defaultValue={getCategory[0].name} name='name'/>
                        </div>
                        <div>
                            <label htmlFor="">Slug</label>
                            <input type="text" defaultValue={getCategory[0].slug} name='slug'/>
                        </div>
                        <div>
                            <button type='submit'>Send</button>
                        </div>
                    </form>
                    <button onClick={() => handleUpdate(showUpdate.id)} className="cursor-pointer">OK</button>
                    <button onClick={e => setShowUpdate({status: false, id: ''})} className="cursor-pointer">Cencal</button>
                </div>
            </div>
            ):('')}

            {showDelete.status ? (
                <div className="fixed top-0 left-0 z-[60] w-full h-full bg-gray-200 opacity-75 overflow-x-hidden overflow-y-auto">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl sm:max-w-lg m-3 mt-7 items-center justify-center px-6 py-8 mx-auto opacity-100">
                        <button onClick={e => setShowDelete({status: false, id: ''})} className="cursor-pointer">X</button>
                        <button onClick={() => handleDelete(showDelete.id)} className="cursor-pointer">OK</button>
                        <button onClick={e => setShowDelete({status: false, id: ''})} className="cursor-pointer">Cencal</button>
                    </div>
                </div>
            ):('')}


            
            <table className="w-full text-left text-gray-500">
                <thead className="text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Tên</th>
                        <th scope="col" className="px-6 py-3">Slug</th>
                        <th scope="col" className="px-6 py-3">
                            Sửa
                        </th>
                        <th scope="col" className="px-6 py-3">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {getCategories.categories.map((category: any, index: any) => 
                        <tr key={index}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.slug}</td>
                            <td><button onClick={() => setShowUpdate({status: true, id: category.id})} className="cursor-pointer">Sửa</button></td>
                            <td><button onClick={() => setShowDelete({status: true, id: category.id})} className="cursor-pointer">Xóa</button></td>
                        </tr>    
                    )}
                </tbody>
                <tfoot></tfoot>
            </table>

            <div className='w-full my-4'>
                <ul className='flex flex-row justify-center'>
                    <li className='border-2 px-3 py-1 cursor-pointer'>
                        <Link href={`/dashboard/categories?page=${1}`}>First</Link>
                    </li>
                    <li className='border-2 px-3 py-1 cursor-pointer'>
                        <Link href={`/dashboard/categories?page=${prev}`}>Pre</Link>
                    </li>
                    { pagination(pageCount) }
                    <li className='border-2 px-3 py-1 cursor-pointer'>
                        <Link href={`/dashboard/categories?page=${next}`}>Next</Link>
                    </li>
                    <li className='border-2 px-3 py-1 cursor-pointer'>
                        <Link href={`/dashboard/categories?page=${pageCount}`}>Last</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

//export default Categories
//<td><button onClick={() => handleDelete(`${category.id}`)} className="cursor-pointer">Xóa</button></td>
//<Link href={`/dashboard/categories/${category.id}`}>Sửa</Link>