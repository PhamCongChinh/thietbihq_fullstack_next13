import Products from "@/components/includes/Products"
import Breadcrumb from "@/components/templates/Breadcrumb"
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
        <>
        <div className="bg-slate-100">
            <Breadcrumb data={'Sản phẩm'}/>
        </div>
        <Products data={data}/>
        </>
    )
}

export default Page