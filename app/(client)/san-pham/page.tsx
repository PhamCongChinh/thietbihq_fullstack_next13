'use client'

import { fetcher } from "@/helpers/constants"
import useSWR from "swr"

const Page = () => {

    const {data, error, isLoading} = useSWR(`/api/products`, fetcher)
    if(error) return <div>ERROR</div>
    if(isLoading) return <div>IS LOADING</div>

    return (
        <div>
            {data?.map((item: any) => {
                return (
                    <div key={item.id}>{item.name}</div>
                )
            })}
        </div>
    )
}

export default Page