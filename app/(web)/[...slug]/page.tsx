import Products from "@/components/includes/Products"
import Product from "@/components/includes/Product"

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
    } else {
        productsByCategory = []
        product = []
    }
    //const a = slug.split(/[/]/)
    return (
        <>
            {slug.length === 1 ? (
                <Products data={productsByCategory}/>
            ) : null}
            {slug.length === 2 ? (
                <Product data={product}/>
            ) : null}
        </>
    )
}
export default Page