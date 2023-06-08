'use client'

import { useAppSelector } from "@/redux/hook"
import { useEffect, useState } from "react"

const ItemsCount = () => {
    const cart = useAppSelector((state) => state.cart)

    const [count, setCount] = useState(0)
    let total = 0
    useEffect(() => {
        for (let i = 0; i < cart.length; i++) {
            const quantity = Number(cart[i].quantity)
            if (quantity > 0) {
                total = total + Number(cart[i].quantity)
            }
        }
        return setCount(total)
    },[cart])
    return (
        <span>
            {count}
        </span>
    )
}

export default ItemsCount