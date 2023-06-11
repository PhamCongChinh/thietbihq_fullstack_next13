'use client'

import { fetcher } from "@/helpers/constants"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"
import Image from "next/image"

export default function ProductsPerPage(){
    const searchParams = useSearchParams()
    const page = searchParams.get("page")
    const {data, error, isLoading, mutate} = useSWR(`/api/productsPerPage?page=${page}`, fetcher)
    console.log("client", data)
    return (
        <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
            {data?.map((item: any) => {
                return (
                    <div key={item.id} className="border-2">
                        <div className="w-full">
                            <Link href={`/${item.slug_category}/${item.slug}`}>
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