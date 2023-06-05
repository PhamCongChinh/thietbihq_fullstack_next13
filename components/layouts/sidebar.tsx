'use client'

import Sidebar from "@/app/(templates)/Sidebar"
import { fetcher } from "@/helpers/constants"
import useSWR from "swr"

const Page = () => {
    const {data, error, isLoading} = useSWR(`/api/categories`, fetcher)
    if (error) {return <div>Error</div>}
    if (isLoading) {return <div>Loading...</div>}
    return(
        <Sidebar data={data}/>
    )
}

export default Page