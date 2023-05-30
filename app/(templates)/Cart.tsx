//'use client'
import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"

const Cart = () => {
    const carts = useSelector((state: RootState) => state.cart.items)
    const cartsCount = useSelector((state: RootState) => state.cart.totalQuantity)
    //const dispatch = useDispatch()
    console.log(carts)
    return (
        <>
            {cartsCount === 0 ? (
                <div>1234567890</div>
            ):(
                <div>0987654321</div>
            )}
        </>
    )
}

export default Cart