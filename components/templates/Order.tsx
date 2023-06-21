'use client'

import { fetcher } from "@/helpers/constants"
import useSWR from "swr"

const Order = (props: any) => {
    const id = props.data
    const {data, error, isLoading} = useSWR(`/api/data/products/${id}`, fetcher)
    console.log(data)
    return (
        <div>
            {data?.map((item: any, index: number) => (
                <div key={index}>{item.name}</div>
            ))}
        </div>
    )
}
export default Order