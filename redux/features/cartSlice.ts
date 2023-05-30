'use client'

import { createSlice } from "@reduxjs/toolkit"

type Cart = {
    items: {
        id: string,
        name: string,
        price: number,
        quantity: number,
        totalPrice: number
    }[],
    totalQuantity: number,
    totalPrice: number
}

const initialState : Cart = {
    items : typeof window !== 'undefined' && JSON.parse(localStorage.getItem("cart") as string) || [],
    totalQuantity : typeof window !== 'undefined' && JSON.parse(localStorage.getItem("total") as string) || 0,
    totalPrice : 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart(state, actions){
            const newItem = actions.payload
            const existingItem = state.items.find((item) => item.id === newItem.id)
            state.totalQuantity++
            if (existingItem) {
                existingItem.quantity++
            }else{
                const product = {...actions.payload, quantity: 1}
                state.items.push(product)
            }
            localStorage.setItem("cart", JSON.stringify(state.items))
            localStorage.setItem("total", JSON.stringify(state.totalQuantity))
        },
        incrementQuantity(state, actions){

        }
    }
})

export const {
    addToCart
} = cartSlice.actions
export default cartSlice.reducer