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
    console.log("slug", slug)
    let productsByCategory = []
    let product = []
    if (slug.length === 1) {
        productsByCategory = await getProductsByCategory(slug[0])
    }else{
        product = await getProduct(slug[1])
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

/**
 *   {slug.length === 1 ? (
                <Products data={slug[0]}/>
            ) : null}
            {slug.length === 2 ? (
                <Product data={slug[1]}/>
            ) : null}
 * <div>
                {data1?(
                    <Products data={data1}/>
                ):(<></>)}
            </div>
            <div>
                {data2?(
                    <Product data={data2}/>
                ):(<></>)}
            </div>
 */