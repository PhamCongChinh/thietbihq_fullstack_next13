'use client'

import { useParams } from "next/navigation"

const Page = () => {
    const params = useParams()
    console.log(params)
    return (
        <div>
            
        </div>
    )
}

export default Page