'use client'
import Link from "next/link"
import useSWR from 'swr'

const fetcher = (args: any) => fetch(args).then(res => res.json())
export default function Category(){
    const { data, error, isLoading } = useSWR('http://localhost:3000/api/categories', fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    console.log(data)

    const handleDelete = (event: any) => {
        event.preventDefault()
        console.log(event)
    }

    return (
        <div className="">
            <button className="bg-gray-500 hover:bg-blue-400 py-2 px-4 rounded inline-flex items-center">
                <span className=" text-justify text-white font-bold">
                    <Link href={'/dashboard/categories/create'}>new</Link>
                </span>
            </button>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Slug</td>
                        <td>Update</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((category: any, index: any) => 
                        <tr key={index}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.slug}</td>
                            <td><Link href={`http://localhost:3000/api/categories/update/${category.id}`}>Update</Link></td>
                            <td><button onClick={handleDelete}>Delete</button></td>
                        </tr>    
                    )}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    )
}

//export default Categories