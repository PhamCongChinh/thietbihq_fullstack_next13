'use client'
import { fetcher } from "@/helpers/constants"
import { decrementQuantity, incrementQuantity, removeFromCart } from "@/redux/features/cartSlice"
import { useAppDispatch } from "@/redux/hook"
import Image from "next/image"
import useSWR from "swr"

const CartItem = (props: any) => {
    const id = props.data
    const dispatch = useAppDispatch()
    const {data, error, isLoading} = useSWR(`/api/products/${id}`, fetcher)
    if(error) return <div>Error</div>
    if(isLoading) return <div>Loading...</div>
    return (
        <div>
            {data?.map((item: any) => (
                <div key={item.id} className="flex">
                    <div><Image src={`/images/products/${item.image}`} alt={"asd"} width={100} height={100}/></div>
                    <p>{item.name}</p>
                    <button className="p-3" onClick={
                        () => dispatch(incrementQuantity(item.id))
                    }>Tang</button>
                    <button className="p-3" onClick={
                        () => dispatch(decrementQuantity(item.id))
                    }>Giam</button>
                    <button className="p-3" onClick={
                        () => dispatch(removeFromCart(item.id))
                    }>Xoa</button>
                </div>
            ))}

        </div>
    )
}

export default CartItem