'use client'

import { fetcher } from "@/helpers/constants"
import useSWR from "swr"
import Image from "next/image"

const ADASD = ({params}:{params: {slug: string}}) => {
    console.log(params.slug)
    const {data, error, isLoading} = useSWR(`/api/products/${params.slug}`, fetcher)
    if(error) return <div>Error</div>
    if(isLoading) return <div>isLoading</div>
    console.log(data)
    return (
        <div>
            {data.map((item: any) => {
                return(
                    <div key={item.id}>
                        <Image src={`/images/products/${item.image}`} width={300} height={300} alt="123123" priority/>
                    </div>
                )
            })}
        </div>
    )
}

export default ADASD