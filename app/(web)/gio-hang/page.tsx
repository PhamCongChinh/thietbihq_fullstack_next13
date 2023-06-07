'use client'
import CartItems from "@/components/templates/CartItems"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { useEffect, useState } from "react"

const Shopping = () => {
    const cart = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()
    const [data, setData] = useState<any>()
    useEffect(() => {
        setData(cart.items)
    }, [cart])
    console.log(data)
    return (
        <CartItems data={data}/>
    )
}

export default Shopping