'use client'
import api from "@/config/axiosconfig"

import { ToastContainer, toast } from 'react-toastify'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { success, unsucces } from "@/redux/features/messageSlice"

const Create = () => {

    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')

    const message = useSelector((state: RootState) => state.message)
    const dispatch = useDispatch()

    const handleCreate = async (e: any) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", name)
        formData.append("slug", slug)

        return await api.post(`/api/categories`, formData)
        .then((res: { data: { status: string; ecode: string } }) => {
            if (res.data.status == "0" && res.data.ecode == "00") {
                toast("Da them thanh cong", { hideProgressBar: true, autoClose: 2000, type: 'success' })
                setName('')
                setSlug('')
                
            }else{
                toast("Them that bai", { hideProgressBar: true, autoClose: 2000, type: 'error' })
                dispatch(unsucces())
            }
        })
    }

    return (
        <div className="block max-w-sm rounded-lg p-6 shadow">
            <span>{message}</span>
            <ToastContainer />
            <button onClick={() => dispatch(success())}>1231231</button>
            <form onSubmit={handleCreate}>
                <div className="relative mb-6">
                    <label htmlFor="">Chuyen muc</label>
                    <input type="text" onChange={e => setName(e.target.value)} value={name} required/>
                </div>
                <div className="relative mb-6">
                    <label htmlFor="">Slug</label>
                    <input type="text" onChange={e => setSlug(e.target.value)} value={slug} required/>
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Create