'use client'
import { SUCCESS, fetcher } from "@/helpers/constants"
import Link from "next/link"
import { useState } from "react"
import useSWR from 'swr'

import { useSearchParams } from 'next/navigation'

export default function Category(){

    const searchParams = useSearchParams()
    const search = searchParams.get("page")

    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')

    // Modal create
    const [showCreate, setShowCreate] = useState(false)

    const { data, error, isLoading } = useSWR(`/api/categories?page=${search}`, fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    const pageCount = Math.ceil(data.totalCategories[0].total/1)

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
    console.log(search)

    let next = null
    if (search == null) {
        next = Number(search) + 2
    }else{
        next = Number(search) + 1
        if(next > pageCount){
            next = pageCount
        }
    }
    

    const handleDelete = async (id: string) => {
        return await fetch(`http://localhost:3000/api/categories/${id}`,{
            method: 'DELETE',
        }).then(response => response.json()).then(res => {
            console.log(res)
            if (res.message == SUCCESS) {
                setMessage('success')
                setShow(true)
            }else{
                setMessage('unsuccess')
                setShow(true)
                alert("Loi roi")
            }
        })
    }

    return (
        <div className="w-full">

            
            <button onClick={() => {setShowCreate(!showCreate)}}>Open</button>
            {showCreate?(
                <div className="fixed z-50 mx-auto bg-slate-400 h-72 w-full">
                    <h1>Da them thanh cong</h1>
                </div>):('')}


            <button className="bg-gray-200 hover:bg-blue-400 py-2 px-4 rounded inline-flex items-center">
                <span className=" text-justify text-black font-bold">
                    <Link href={'/dashboard/categories/create'}>new</Link>
                </span>
            </button>

            
            <table className="w-full text-left text-gray-500">
                <thead className="text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Ten</th>
                        <th scope="col" className="px-6 py-3">Slug</th>
                        <th scope="col" className="px-6 py-3">
                            Sua
                        </th>
                        <th scope="col" className="px-6 py-3">Xoa</th>
                    </tr>
                </thead>
                <tbody>
                    {data.categories.map((category: any, index: any) => 
                        <tr key={index}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.slug}</td>
                            <td><Link href={`/dashboard/categories/${category.id}`}>Update</Link></td>
                            <td><button onClick={() => handleDelete(`${category.id}`)} className="cursor-pointer">Delete</button></td>
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