import Products from "@/components/includes/Products"
import { Metadata } from 'next'
 
export const metadata: Metadata = {
    title: 'Sản phẩm',
    description: 'Sản phẩm',
}

async function getProducts() {
    const res = await fetch(`http://localhost:3000/api/products`)
    return res.json()
}

const Page = async () => {
    const data = await getProducts()
    return (
        <Products data={data}/>
    )
}

export default Page