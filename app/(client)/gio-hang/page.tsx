'use client'

import Cart from "@/app/(templates)/Cart"
import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"

const Shopping = () => {
    return (
        <Cart/>
    )
}

export default Shopping