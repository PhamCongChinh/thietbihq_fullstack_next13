'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { useEffect, useState } from "react"
import CartItem from "./CartItem"
import Link from "next/link"
import useSWR from "swr"
import { fetcher } from "@/helpers/constants"

const CartItems = () => {
    const cart = useAppSelector((state) => state.cart)
    const [cartItems, setCartItems] = useState([{id:0,quantity:0}])
    useEffect(() => {
        return setCartItems(cart)
    },[cart])
    return(
        <>
        {cartItems.length === 0 ? (
            <div>
                <p className="flex justify-center pt-4">
                    <svg className="h-16 w-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </p>
                <p className="flex justify-center pb-4">Không có sản phẩm nào trong giỏ hàng!</p>
            </div>
        ):(
            <>
            <ul className="p-3">
                {cartItems.map((item) => (
                    <li key={item.id}>
                        <CartItem data={item}/>
                    </li>
                ))}
            </ul>
            <div className="mx-auto flex justify-between px-3 py-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link href="/san-pham">Mua tiếp</Link>
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link href={`/gio-hang/dat-hang`}>Đặt hàng</Link>
                </button>
            </div>
            </>
        )}
        </>
    )
}
export default CartItems