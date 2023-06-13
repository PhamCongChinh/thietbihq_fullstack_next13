import Products from "@/components/includes/Products"
import Product from "@/components/includes/Product"
import { Metadata } from "next"

type Props = {
    params: { slug: string }
    //searchParams: { [key: string]: string | string[] | undefined }
}

async function getCategory(slug: string) {
    const res = await fetch(`http://localhost:3000/api/categories/${slug}`)
    return res.json()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = params.slug
    console.log(slug[0])
    const [data] = await getCategory(slug[0])
    console.log("getCategory", data)
    return {
        title: data.name,
        description: data.id
    }
}

async function getProductsByCategory(slug: string) {
    const res = await fetch(`http://localhost:3000/api/getProductsByCategory/${slug}`)
    return res.json()
}
async function getProduct(slug: string) {
    const res = await fetch(`http://localhost:3000/api/products/${slug}`)
    return res.json()
}

const Page = async ({
    params: { slug },
}:{
    params: { slug: string}
}) => {
    let productsByCategory = []
    let product = []
    if (slug.length === 1) {
        productsByCategory = await getProductsByCategory(slug[0])
    }if (slug.length === 2) {
        product = await getProduct(slug[1])
    }
    //const a = slug.split(/[/]/)
    return (
        <>
            
            {productsByCategory ? (
                <>
                <Products data={productsByCategory}/>
                </>
            ) : null}
            {product ? (
                <>
                <Product data={product}/>
                </>
            ) : null}
        </>
    )
}
export default Page