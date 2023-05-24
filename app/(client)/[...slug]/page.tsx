'use client'

import { fetcher } from "@/helpers/constants"
import { useParams } from "next/navigation"
import useSWR from "swr"

const Page = () => {
    const params = useParams()
    const slug = params.slug.split(/[/]/)
    let slug_category
    let slug_product

    if (slug.length == 1) {
        slug_category = slug[0]
    }else{
        slug_product = slug[1]
    }
    const {data: data1, error:error1, isLoading:isLoading1} = useSWR(`/api/categories/${slug_category}`, fetcher)
    const {data: data2, error:error2, isLoading:isLoading2} = useSWR(`/api/products/${slug_product}`, fetcher)
    //if(error1) return <div>Error</div>
    //if(isLoading1) return <div>Loading...</div>
    console.log("Data1", data1)
    console.log("Data2", data2)

    return (
        <div>
            {data1?.map((item: any) => {
                return (
                    <div key={item.id}>{item.name}</div>
                )
            })}
            <ul>
                {data2?.map((item: any) => {
                    return (
                        <li key={item.id}>{item.name}</li>
                    )
                })}
            </ul>
            
            
        </div>
    )
}

export default Page

/**
 * {data1?.map((item: any) => {
                return (
                    <div key={item.id}>{item.name}</div>
                )
            })}
 */