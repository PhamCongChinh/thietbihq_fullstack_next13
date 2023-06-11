import { Inter } from 'next/font/google'

import Products from '@/components/includes/Products'
import Pagination from '@/components/templates/Pagination'
import ProductsPerPage from '@/components/includes/ProductsPerPage'

const inter = Inter({ subsets: ['latin'] })

async function getProducts() {
    const res = await fetch(`http://localhost:3000/api/products`)
    return res.json()
}
async function getProductsPerPage(page:string) {
    const res = await fetch(`http://localhost:3000/api/productsPerPage?page=${page}`)
    return res.json()
}

const Home = async () => {
    //const products = await getProducts()
    //console.log("Home data:", products)
    const productsPerPage = await getProductsPerPage('1')
    console.log("productsPerPage:", productsPerPage)

    const pagi = {
        count: 5,
        page: 1
    }
    return (
        <div>
            <ProductsPerPage/>
            <div className='mt-5'>
                <ul className='flex'>
                    
                </ul>
                <ul className='flex'>
                    <Pagination data={pagi}/>
                </ul>
            </div>
        </div>
    )
}

export default Home
//<Products data={productsPerPage}/>
//className="border-2 px-3 py-1 cursor-pointer"
//{pagination(productsCount.count)}