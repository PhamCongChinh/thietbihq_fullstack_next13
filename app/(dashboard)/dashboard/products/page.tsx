'use client'
import { fetcher } from "@/helpers/constants"
import { useState } from "react"
import useSWR from "swr"

const Products = () => {
    const [show, setShow] = useState(false)
    const [select, setSelect] = useState("")
    const [file, setFile] = useState(null)

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

    const handleOnChangeFile = (e: any) => {
        setFile(e.target.files[0].name)
    }

    const confirm = (e: any) => {
        e.preventDefault()

        console.log(file)

        const data = {
            id: e.target.id.value,
            categoryId: select,
            name: e.target.name.value,
            slug: e.target.slug.value,
            imageFile: e.target.files[0],
            imageLink: e.target.files[0].name
        }
        
    }
    
    return(
        <div>
            <button onClick={handleCreate}>Modal</button>
            {show ? 
                <div className="fixed top-0 left-0 right-0 bottom-0 z-50 w-full bg-gray-50 opacity-75">
                    <div className="flex items-center justify-center h-3/5">
                        <div className="bg-white rounded-lg shadow">
                            <div className="flex justify-between p-4">
                                <form onSubmit={confirm} encType="multipart/form-data">
                                    <div className="flex justify-between mt-2">
                                        <label htmlFor="">Id</label>
                                        <input type="text" name="id" className="border"/>
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
                                        <input type="file" name="file" onChange={handleOnChangeFile} className="border"/>
                                    </div>
                                    <div>
                                        <button type="submit" className="mt-2">Send</button>
                                    </div>
                                </form>
                            </div>
                            <div className="flex justify-center pb-4">
                                <button onClick={confirm} className="pr-2">OK</button>
                                <button onClick={handleCreate} className="pl-2">Cancel</button>
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