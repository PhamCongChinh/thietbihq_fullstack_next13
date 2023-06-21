'use client'
import { fetcher } from "@/helpers/constants"
import { decrementQuantity, incrementQuantity, removeFromCart } from "@/redux/features/cartSlice"
import { useAppDispatch } from "@/redux/hook"
import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"

const CartItem = (props: any) => {
    const cartItem = props.data
    const dispatch = useAppDispatch()
    const {data, error, isLoading} = useSWR(`/api/data/products/${cartItem.id}`, fetcher)
    if(error) return <div>Error</div>
    if(isLoading) return <div>Loading...</div>
    return (
        <div>
            {data?.map((item: any) => (
                <div key={item.id} className="grid border-b py-2 md:grid-cols-10">
                    <div className="pt-1 md:col-span-1">
                        <Image src={`/images/products/${item.image}`} alt={item.name} width={70} height={70}/>
                    </div>
                    <div className="py-1 md:col-span-6 flex items-center">{item.name}</div>

                    <div className="py-1 md:col-span-2 flex items-center">
                        <button className="hover:bg-blue-500 text-gray-400 font-bold py-1 px-2 border" onClick={
                            () => dispatch(decrementQuantity(item.id))
                        }>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                            </svg>
                        </button>
                        
                        <div className="py-1 px-4 border">{cartItem.quantity}</div>

                        <button className="hover:bg-blue-500 text-gray-400 font-bold py-1 px-2 border" onClick={
                            () => dispatch(incrementQuantity(item.id))
                        }>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
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