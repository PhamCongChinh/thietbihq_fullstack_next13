'use client'
import { fetcher } from "@/helpers/constants"
import { decrementQuantity, incrementQuantity, removeFromCart } from "@/redux/features/cartSlice"
import { useAppDispatch } from "@/redux/hook"
import Image from "next/image"
import useSWR from "swr"

const CartItem = (props: any) => {
    const cartItem = props.data
    const dispatch = useAppDispatch()
    const {data, error, isLoading} = useSWR(`/api/products/${cartItem.id}`, fetcher)
    if(error) return <div>Error</div>
    if(isLoading) return <div>Loading...</div>
    return (
        <div>
            {data?.map((item: any) => (
                <div key={item.id} className="grid border-b py-2 md:grid-cols-10">
                    <div className="pt-1 md:col-span-1 md:h-56 md:w-full">
                        <Image src={`/images/products/${item.image}`} alt={"asd"} width={28} height={36}/>
                    </div>
                    <div className="py-1 md:col-span-6 flex items-center">{item.name}</div>
                    <div className="py-1 md:col-span-2 flex items-center">
                        <button className="hover:bg-blue-500 text-gray-400 font-bold py-1 px-2 border" onClick={
                            () => dispatch(decrementQuantity(item.id))
                        }>Giam</button>
                        
                        <div className="py-1 px-4 border">{cartItem.quantity}</div>
                        <button className="p-3" onClick={
                            () => dispatch(incrementQuantity(item.id))
                        }>Tang</button>
                    </div>
                    <div className="flex items-center py-1 md:col-span-1 md:justify-center">
                        <button className="p-3" onClick={
                            () => dispatch(removeFromCart(item.id))
                        }>Xoa</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CartItem