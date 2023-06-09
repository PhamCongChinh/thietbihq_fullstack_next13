'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { useEffect, useState } from "react"
import CartItem from "./CartItem"

const CartItems = () => {
    const cart = useAppSelector((state) => state.cart)
    const [cartItems, setCartItems] = useState([{id:0,quantity:0}])
    const dispatch = useAppDispatch()
    useEffect(() => {
        return setCartItems(cart)
    },[cart])

    console.log(cartItems)
    
    return(
        <>
        <ul>
            {cartItems.map((item) => (
                <li key={item.id}>
                    <CartItem data={item.id}/>
                </li>
            ))}
            
        </ul>
        </>
    )
}
export default CartItems