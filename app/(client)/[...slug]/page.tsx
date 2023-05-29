'use client'

import { fetcher } from "@/helpers/constants"
import { addToCart } from "@/redux/features/cartSlice"
import { RootState } from "@/redux/store"
import Image from "next/image"
import Link from 'next/link'
import { useParams, usePathname } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

/*interface cartItem {
    id: string,
    name: string,
    slug: string,
    total?: string
}*/


const Page = () => {
    const params = useParams()
    const pathname = usePathname()
    const slug = params.slug.split(/[/]/)
    let slug_category
    let slug_product

    if (slug.length == 1) {
        slug_category = slug[0]
    }else{
        slug_product = slug[1]
    }
    const {data: data1, error:error1, isLoading:isLoading1} = useSWR(`/api/getProductsByCategory/${slug_category}`, fetcher)
    const {data: data2, error:error2, isLoading:isLoading2} = useSWR(`/api/products/${slug_product}`, fetcher)
    if(error1 || error2) return <div>Error</div>
    if(isLoading1 || isLoading2) return <div>Loading...</div>

    const itemCart = {
        id: "data2[0].id",
        name: "data2[0].name",
        slug: "data2[0].slug"
    }
    
    const dispatch = useDispatch()
    //const carts = useSelector((state: RootState) => state.cart)
    

    return (
        <>
            <div>
                {data1?.map((item: any) => {
                    return (
                        <div key={item.id}>
                            <Link href={`${pathname}/${item.slug}`}>
                                <Image src={`/images/products/${item.image}`} width={150} height={300} alt="Pham" priority/>
                                {item.name}
                            </Link>
                        </div>
                    )
                })}
            </div>
            <div>
                {data2?.map((item: any) => {
                    return (
                        <div key={item.id} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="bg-slate-700">
                                <Image 
                                    src={`/images/products/${item.image}`}
                                    height={300}
                                    width={300}
                                    alt={`${item.name}`}
                                    priority/>
                            </div>
                            <div className="">
                                <div>{item.name}</div>
                                <div>{item.image}</div>

                                <div className="mt-6 flex">
                                    <button className="w-full border-2" onClick={
                                        () => dispatch(addToCart())
                                    }>ADD CAST</button>
                                    <button className="w-full border-2">BUY</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Page