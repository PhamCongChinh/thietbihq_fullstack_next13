'use client'

import { fetcher } from "@/helpers/constants"
import Link from "next/link"
import useSWR from "swr"

const Sidebar = () => {
    const {data, error, isLoading} = useSWR(`/api/categories`, fetcher)
    console.log("Sidebar", data)
    if (error) {return <div>Error</div>}
    if (isLoading) {return <div>Loading...</div>}
    return(
        <>
            <div className="bg-white"><h3 className="font-bold p-2 text-white text-center">Danh mục sản phẩm</h3></div>
            <ul className="font-normal">
                {data?.map((item: any, index: any) => {
                    return(
                        <li className="pl-4 pt-1 pb-1" key={item.id}>
                            <Link href={`/${item.slug}`}>{item.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Sidebar

/**
 * {data?.map((item: any, index: any) => {
                    return(
                        <li className="pl-4 pt-1 pb-1" key={item.id}>
                            <Link href={`/san-pham/${item.slug}`}>{item.name}</Link>
                        </li>
                    )
                })}
 */