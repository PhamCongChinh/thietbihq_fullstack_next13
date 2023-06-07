//'use client'

//import Products from "@/app/(templates)/Products"
import Products from "@/components/includes/Products"
import { fetcher } from "@/helpers/constants"
import useSWR from "swr"

async function getProducts() {
    const res = await fetch(`http://localhost:3000/api/products`)
    return res.json()
}

const SanPham = async () => {

    //const {data, error, isLoading} = useSWR(`/api/products`, fetcher)
    //if(error) return <div>ERROR</div>
    //if(isLoading) return <div>Dang tai...</div>
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