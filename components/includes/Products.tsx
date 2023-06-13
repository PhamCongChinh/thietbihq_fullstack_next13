'use client'

import Link from "next/link"
import Image from "next/image"

const Products = ({data}: any) => {
    return (
        <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
            {data?.map((item: any) => (
                <div key={item.id} className="border-2 relative">
                    <Link href={`/${item.slug_category}/${item.slug}`}>
                        <div className="flex justify-center md:h-56 md:w-full">
                            <Image src={`/images/products/${item.image}`} alt={`${item.name}`} width={200} height={200} />
                        </div>
                        <div className="px-3 py-2 text-gray-800 text-sm font-semibold">{item.name}</div>
                        <div className="px-3 py-2 text-red-500 font-semibold text-sm">Lien He</div>
                    </Link>
                </div>
                )
            )}
        </div>
    )
}

export default Products