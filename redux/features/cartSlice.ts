'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: typeof window !== 'undefined' && localStorage.getItem("cart") || [],
    cartTotalQuantity: typeof window !== 'undefined' && localStorage.getItem("total") || 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart:(state: any) => {
            state.cartTotalQuantity++
            localStorage.setItem("cart", JSON.stringify(state.cartItems))
            localStorage.setItem("total", JSON.stringify(state.cartTotalQuantity))
        }
    }
})

export const {
    addToCart
} = cartSlice.actions
export default cartSlice.reducer