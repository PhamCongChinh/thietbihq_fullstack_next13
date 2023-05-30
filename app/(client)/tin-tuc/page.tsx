'use client'

import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"

const News = () => {
    const breadcrumb = useSelector((state: RootState) => state.breadcrumb.value)
    console.log(breadcrumb)
    const dispatch = useDispatch()
    
    return (
        <div>Tin tuc</div>
    )
}

export default News