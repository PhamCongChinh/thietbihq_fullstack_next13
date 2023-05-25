'use client'

import { fetcher } from "@/helpers/constants"
import Image from "next/image"
import Link from 'next/link'
import { useParams, usePathname } from "next/navigation"
import useSWR from "swr"


const Page = () => {
    const params = useParams()
    const pathname = usePathname()
    console.log(pathname)
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
    console.log("Data1", data1)
    console.log("Data2", data2)

    return (
        <div>
            {data1?.map((item: any) => {
                return (
                    <div key={item.id}>
                        <Link href={`${pathname}/${item.slug}`}>
                            <Image src={`/images/products/${item.image}`} width={150} height={300} alt="Pham" priority/>
                            {item.name}
                        </Link>
                    </div>
                )
            })}
            <div>
                {data2?.map((item: any) => {
                    return (
                        <div key={item.id}>
                            <Image src={`/images/products/${item.image}`} width={150} height={300} alt="Pham" priority/>
                            {item.name}
                        </div>
                    )
                })}
            </div>
            
            
        </div>
    )
}

export default Page