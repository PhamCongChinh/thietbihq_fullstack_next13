'use client'

import { fetcher } from "@/helpers/constants"
import useSWR from "swr"

const swrFetch = (url: string) => {
    const { data, error, isLoading} = useSWR(url, fetcher)
    if (error) {
        return(<div>Error</div>)
    }
    if (isLoading) {
        return(<div>Loading...</div>)
    }
    return data
}

export { swrFetch }