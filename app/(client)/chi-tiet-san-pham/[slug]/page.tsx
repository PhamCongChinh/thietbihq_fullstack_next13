'use client'

import { fetcher } from "@/helpers/constants"
import useSWR from "swr"
import Image from "next/image"

const Page = ({params}:{params: {slug: string}}) => {
    console.log(params.slug)
    const {data, error, isLoading} = useSWR(`/api/products/${params.slug}`, fetcher)
    if(error) return <div>Error</div>
    if(isLoading) return <div>isLoading</div>
    console.log(data)
    return (
        <div>
            <Image src={`/images/products/${data.image}`} width={300} height={300} alt="123123" priority/>
            <div>{data.name}</div>
        </div>
    )
}

export default Page