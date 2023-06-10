import { Inter } from 'next/font/google'
import Link from 'next/link'

import Products from '@/components/includes/Products'
import Pagination from '@/components/templates/Pagination'

const inter = Inter({ subsets: ['latin'] })

async function getProducts() {
    const res = await fetch(`http://localhost:3000/api/products`)
    return res.json()
} 

const Home = async () => {
    const data = await getProducts()
    console.log(data)
    //Client
    //const searchParams = useSearchParams()
    //const search = searchParams.get("page")

    /*let page = 0
    if (search) {
        if (Number(search) >= 0) {
            page = Number(search)
        }
    }
    if (page > 0) {
        page = page - 1
    }

    let prev = 0
    let next = 0*/

    /*const { data:productsCount, error:productsCountError, isLoading: productsCountIsLoading} = useSWR(`/api/productsCount`, fetcher)
    const pagination = (count: number) => {
        let content = []
        for(let i=1;i<=count;i++){
            content.push(<li key={i} className={Number(search)== i ? "bg-blue-500 text-white" : ""}>
                <Link href={`/?page=${i}`} className="border-2 px-3 py-1 cursor-pointer">
                    <span>{i}</span>
                </Link>
            </li>)
        }
        return content
    }

    const { data:productsData, error:productsError, isLoading:productsIsLoading } = useSWR(`/api/productsPerPage?page=${page}`, fetcher)
    if (productsError || productsCountError) return <div>Error</div>
    if (productsIsLoading || productsCountIsLoading) return <div>Loading...</div>

*/
    const pagi = {
        count: 5,
        page: 1
    }
    return (
        <div>
            <Products data={data}/>

            <div className='mt-5'>
                <ul className='flex'>
                    asd
                    
                </ul>
                <ul className='flex'>
                    123
                    <Pagination data={pagi}/>
                </ul>
            </div>
        </div>
    )
}

export default Home
//<Products data={productsData}/>
//className="border-2 px-3 py-1 cursor-pointer"
//{pagination(productsCount.count)}