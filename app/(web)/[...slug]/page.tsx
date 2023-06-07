'use client'

//import Product from "@/app/(templates)/Product"
//import Products from "@/app/(templates)/Products"

import Products from "@/components/includes/Products"
import Product from "@/components/includes/Product"
import { fetcher } from "@/helpers/constants"
import { useParams } from "next/navigation"
import useSWR from "swr"

const Page = () => {
    const params = useParams()
    const slug = params.slug.split(/[/]/)
    return (
        <>
            {slug.length === 1 ? (
                <Products data={slug[0]}/>
            ) : null}
            {slug.length === 2 ? (
                <Product data={slug[1]}/>
            ) : null}
        </>
    )
}
export default Page

/**
 * <div>
                {data1?(
                    <Products data={data1}/>
                ):(<></>)}
            </div>
            <div>
                {data2?(
                    <Product data={data2}/>
                ):(<></>)}
            </div>
 */