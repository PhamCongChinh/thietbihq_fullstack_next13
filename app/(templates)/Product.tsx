import Image from "next/image"
import AddToCart from "./AddToCart"

const Product = (data : any) => {
    const product = data.data
    return (
        <div>
            {product.map((item: any) => (
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
                        <AddToCart data={{
                            id: item.id,
                            name: item.name,
                            slug: item.slug
                        }}/>
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}

export default Product