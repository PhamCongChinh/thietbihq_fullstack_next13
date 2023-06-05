import Link from "next/link"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { breadcrumb } from "@/redux/features/breadcrumbSlice"
import { useEffect } from "react"

const Products = ({data}: any) => {

    return (
        <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
            {data?.map((item: any) => {
                return (
                    <div key={item.id} className="border-2">
                        <div className="w-full">
                            <Link href={`/${item.c_slug}/${item.slug}`}>
                                <Image src={`/images/products/${item.image}`} alt={`${item.name}`} width={200} height={200} />
                            </Link>
                        </div>
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Products

//<Image src={`/images/products/${item.image}`} alt={`${item.name}`} width={200} height={200} />
//<Image src={`/images/songoku.png`} alt={`${item.name}`} width={300} height={200} />