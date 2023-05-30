import { addToCart } from "@/redux/features/cartSlice"
import { useDispatch } from "react-redux"

const AddToCart = (props: any) => {
    const dispatch = useDispatch()
    console.log(props.data)
    return (
        <div className="">
            <button className="w-full border-2" onClick={
                () => dispatch(addToCart(props.data))
            }>ADD CAST</button>
            <button className="w-full border-2">BUY</button>
        </div>
    )
}

export default AddToCart