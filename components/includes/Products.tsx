'use client'

import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { fetcher } from "@/helpers/constants"
import { useSearchParams } from "next/navigation"

const Products = (slug: any) => {
    const searchParams = useSearchParams()
    const search = searchParams.get("page")
    console.log("search seasd", search)
    console.log("slug", slug.data)
    const {data, error, isLoading} = useSWR(`/api/getProductsByCategory/${slug.data}`, fetcher)
    console.log("data in list", data)
    return (
        <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
            {data?.map((item: any) => {
                return (
                    <div key={item.id} className="border-2">
                        <div className="w-full">
                            <Link href={`/${item.c_slug}/${item.slug}`}>
                                <Image src={`/images/products/${item.image}`} alt={`${item.name}`} width={200} height={200} />
                            </Link>
                        </div>
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Products