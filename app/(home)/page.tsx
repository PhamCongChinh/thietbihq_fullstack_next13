import { Inter } from 'next/font/google'

import Products from '@/components/includes/Products'
import Pagination from '@/components/templates/Pagination'

const inter = Inter({ subsets: ['latin'] })

async function getProducts() {
    const res = await fetch(`http://localhost:3000/api/products`)
    return res.json()
}

const Home = async () => {
    const products = await getProducts()
    console.log("Home data:", products)

    const pagi = {
        count: 5,
        page: 1
    }
    return (
        <div>
            <Products data={products}/>
        </div>
    )
}

export default Home