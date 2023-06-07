'use client'
import { addToCart } from "@/redux/features/cartSlice"
import { useAppDispatch } from "@/redux/hook"

const AddToCart = (props: any) => {
    const id = props.data
    const dispatch = useAppDispatch()
    return (
        <div className="">
            <button className="w-full border-2" onClick={
                () => dispatch(addToCart(id))
            }>ADD CAST</button>
            <button className="w-full border-2">BUY</button>
        </div>
    )
}

export default AddToCart