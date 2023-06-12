'use client'
import { addToCart } from "@/redux/features/cartSlice"
import { useAppDispatch } from "@/redux/hook"
import Button from "./Button"

const AddToCart = (props: any) => {
    const id = props.data
    const dispatch = useAppDispatch()
    return (
        <div className="flex flex-row w-full text-white">
            <button className="w-full bg-blue-500 rounded py-2" onClick={
                () => dispatch(addToCart(id))
            }>ADD CAST</button>
            <button className="w-full bg-yellow-400 rounded py-2">BUY</button>
        </div>
    )
}

export default AddToCart

/**
 * <button className="w-full border-2" onClick={
                () => dispatch(addToCart(id))
            }>ADD CAST</button>
 */