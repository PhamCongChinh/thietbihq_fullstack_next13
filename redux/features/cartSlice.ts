'use client'

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

/*type Cart = {
    items: {
        id: string,
        name: string,
        price: number,
        quantity: number,
        totalPrice: number
    }[],
    totalQuantity: number,
    totalPrice: number
}*/
type Cart = {
    items: {
        id: string,
        quantity: number,
    }[]
}

const initialState : Cart = {
    items: typeof window !== 'undefined' && JSON.parse(localStorage.getItem("cart") as string) || [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart(state, actions){
            const newItem = actions.payload
            const existingItem = state.items.find((item) => item.id === newItem)
            if (existingItem) {
                existingItem.quantity++
            }else{
                const cartItems = { id: newItem, quantity: 1}
                state.items.push(cartItems)
            }
            localStorage.setItem("cart", JSON.stringify(state.items))
        },
        incrementQuantity(state, actions){

        }
    }
})

export const {
    addToCart
} = cartSlice.actions
export const items = (state: RootState) => state.cart.items
export default cartSlice.reducer