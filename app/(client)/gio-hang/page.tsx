'use client'

import Cart from "@/app/(templates)/Cart"
import { RootState } from "@/redux/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Shopping = () => {
    const carts = useSelector((state: RootState) => state.cart.items)
    const cartsCount = useSelector((state: RootState) => state.cart.totalQuantity)
    const dispatch = useDispatch()
    const [data, setData] = useState({})
    useEffect(() => {
        setData(carts)
    },[])

    return (
        <Cart data={data}/>
    )
}

export default Shopping