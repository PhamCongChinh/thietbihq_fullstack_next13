'use client'
import { Alert } from "@/components/templates/alert"
import { fetcher } from "@/helpers/constants"
import Link from "next/link"
import { useState } from "react"
import useSWR from 'swr'

export default function Category(){


    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [pageNumber, setPageNumber] = useState(2)

    const { data, error, isLoading } = useSWR('/api/categories', fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    
    const itemsPerPage = 3
    const pagesVisited = pageNumber * itemsPerPage
    const pageCount = Math.ceil(data.length/itemsPerPage)


    console.log('pageNumber :', pageNumber)
    console.log('pagesVisited :', pagesVisited)
    console.log('pageCount :', pageCount)

    console.log(data.slice(pagesVisited, pagesVisited + itemsPerPage))

    const handleDelete = async (id: string) => {
        const res = await fetch(`http://localhost:3000/api/categories/${id}`,{
            method: 'DELETE',
        })
        console.log(res)
        if (res.ok) {
            setMessage('success')
            setShow(true)
        }else{
            setMessage('unsuccess')
            setShow(true)
        }
    }

    return (
        <div className="w-full">
            <button className="bg-gray-500 hover:bg-blue-400 py-2 px-4 rounded inline-flex items-center">
                <span className=" text-justify text-white font-bold">
                    <Link href={'/dashboard/categories/create'}>new</Link>
                </span>
            </button>

            {show == true ? <Alert data={message}/> : ''}
            
            <table className="w-full">
                <thead className="bg-slate-300">
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Slug</td>
                        <td>Update</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(pagesVisited, pagesVisited + itemsPerPage).map((category: any, index: any) => 
                        <tr key={index}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.slug}</td>
                            <td><Link href={`http://localhost:3000/dashboard/categories/${category.id}`}>Update</Link></td>
                            <td><button onClick={() => handleDelete(`${category.id}`)} className="cursor-pointer">Delete</button></td>
                        </tr>    
                    )}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    )
}

//export default Categories