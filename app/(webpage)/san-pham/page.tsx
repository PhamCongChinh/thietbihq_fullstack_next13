'use client'

import Products from "@/app/(templates)/Products"
import { fetcher } from "@/helpers/constants"
import useSWR from "swr"

const Page = () => {

    const {data, error, isLoading} = useSWR(`/api/products`, fetcher)
    if(error) return <div>ERROR</div>
    if(isLoading) return <div>Dang tai...</div>

    return (
        <>
            <Products data={data}/>
        </>
    )
}

export default Page

/**{data?.map((item: any) => {
                return (
                    <div key={item.id}>{item.name}</div>
                )
            })} */