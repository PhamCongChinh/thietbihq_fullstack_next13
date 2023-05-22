'use client'

import { fetcher } from "@/helpers/constants"
import { swrFetch } from "@/helpers/swrFetch"
import useSWR from "swr"

const Sidebar = () => {
    /*const {data, error, isLoading} = useSWR(`/api/categories/getCategories`, fetcher)
    console.log(data)
    if (error) {return <div>Error</div>}
    if (isLoading) {return <div>Loading...</div>}*/
    const data = swrFetch(`/api/categories/getCategories`)
    console.log(data)
    return(
        <>
            <div className="bg-white"><h3 className="font-bold p-2 text-white text-center">Danh mục sản phẩm</h3></div>
            <ul className="font-normal">
                {data?.map((item: any, index: any) => {
                    return(
                        <li className="pl-4 pt-1 pb-1" key={item.id}>{item.name}</li>
                    )
                })}
            </ul>
        </>
    )
}

export default Sidebar