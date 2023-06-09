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
            localStorage.setItem("cart", JSON.stringify(state))
        },
        decrementQuantity(state, actions){
            const existingItem = state.find((item: any) => item.id === actions.payload)
            if (existingItem.quantity === 1) {
                const indexItem = state.findIndex((item: any) => item.id === actions.payload) //tim index
                state.splice(indexItem, 1) // xoa khoi danh sach
            }else{
                existingItem.quantity--
            }
            console.log(existingItem.quantity)
            localStorage.setItem("cart", JSON.stringify(state))
        },
        removeFromCart(state, actions){
            const indexItem = state.findIndex((item: any) => item.id === actions.payload)
            console.log(state.quantity)
            state.splice(indexItem, 1)
            localStorage.setItem("cart", JSON.stringify(state))
        },
    }
})

export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
} = cartSlice.actions
export const items = (state: RootState) => state.cart.items
export default cartSlice.reducer