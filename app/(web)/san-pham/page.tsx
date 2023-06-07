
import Products from "@/components/includes/Products"

async function getProducts() {
    const res = await fetch(`http://localhost:3000/api/products`)
    return res.json()
}

const SanPham = async () => {

    const data = await getProducts()
    console.log(data)
    return (
        <>
            <Products data={data}/>
        </>
    )
}

export default SanPham
//<Products data={data}/>
/**{data?.map((item: any) => {
                return (
                    <div key={item.id}>{item.name}</div>
                )
            })} */