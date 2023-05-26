import Link from "next/link"
import Image from "next/image"

const Products = ({data}: any) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {data?.map((item: any) => {
                return (
                    <div key={item.id}>
                        <Link href={`/${item.slug_category}/${item.slug}`}>
                            <Image src={`/images/products/${item.image}`} alt={`${item.name}`} width={200} height={200} />
                        </Link>
                        <div>{item.name}</div>
                        <div>{item.image}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Products