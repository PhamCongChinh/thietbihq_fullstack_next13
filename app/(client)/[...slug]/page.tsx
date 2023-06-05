'use client'

import Product from "@/app/(templates)/Product"
import Products from "@/app/(templates)/Products"
import { fetcher } from "@/helpers/constants"
import { useParams, usePathname } from "next/navigation"
import useSWR from "swr"

const Page = () => {
    const params = useParams()
    const pathname = usePathname()
    const slug = params.slug.split(/[/]/)
    let slug_category
    let slug_product

    if (slug.length == 1) {
        slug_category = slug[0]
    }else{
        slug_product = slug[1]
    }
    const {data: data1, error:error1, isLoading:isLoading1} = useSWR(`/api/getProductsByCategory/${slug_category}`, fetcher)
    const {data: data2, error:error2, isLoading:isLoading2} = useSWR(`/api/products/${slug_product}`, fetcher)
    if(error1 || error2) return <div>Error</div>
    if(isLoading1 || isLoading2) return <div>Loading...</div>

    return (
        <>
            <div>
                {data1?(
                    <Products data={data1}/>
                ):(<></>)}
            </div>
            <div>
                {data2?(
                    <Product data={data2}/>
                ):(<></>)}
            </div>
        </>
    )
}
export default Page