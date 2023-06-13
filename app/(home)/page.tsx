import { Inter } from 'next/font/google'

import Products from '@/components/includes/Products'

const inter = Inter({ subsets: ['latin'] })

async function getProducts() {
    const res = await fetch(`http://localhost:3000/api/products`)
    return res.json()
}

const Home = async () => {
    const products = await getProducts()
    console.log("Home data:", products)
    return (
        <Products data={products}/>
    )
}

export default Home