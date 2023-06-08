'use client'

import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

let initialState = []

if (typeof window !== 'undefined' && localStorage.getItem("cart")) {
    try {
        const data = localStorage.getItem("cart")
        initialState = JSON.parse(data as string)
    } catch (error) {
        initialState = []
    }
}else{
    initialState = []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart(state, actions){
            const idNewItem = actions.payload
            let cartItems = {}
            try {
                const existingItem = state.find((item: any) => item.id === idNewItem)
                if (existingItem) {
                    existingItem.quantity++
                }else{
                    cartItems = { id: idNewItem, quantity: 1}
                    state.push(cartItems)
                }
            } catch (error) {
                cartItems = { id: idNewItem, quantity: 1}
                initialState = []
                state.push(cartItems)
            }
            localStorage.setItem("cart", JSON.stringify(state))
        },
        incrementQuantity(state, actions){
            const existingItem = state.find((item: any) => item.id === actions.payload)
            existingItem.quantity++
            //localStorage.setItem("cart", JSON.stringify(state))
        }
    }
})

export const {
    addToCart, incrementQuantity
} = cartSlice.actions
export const items = (state: RootState) => state.cart.items
export default cartSlice.reducer