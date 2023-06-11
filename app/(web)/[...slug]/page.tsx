import Products from "@/components/includes/Products"
import Product from "@/components/includes/Product"
import { Metadata } from "next"

type Props = {
    params: { slug: string }
    //searchParams: { [key: string]: string | string[] | undefined }
}
export function generateMetadata({ params }: Props): Metadata {
    console.log("params1111", params)
    const slug = params.slug
    console.log(slug[0])
    return {
        title: slug[0],
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
    console.log("slug:", slug)
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