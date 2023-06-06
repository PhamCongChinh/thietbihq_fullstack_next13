'use client'
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

const ShoppingCart = () => {
    const total = useSelector((state: RootState) => state.cart.totalQuantity)
    return (
        <span>1</span>
    )
}

export default ShoppingCart