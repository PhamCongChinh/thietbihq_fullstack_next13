'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import mabu from '../../public/images/mabu.jpeg'
import useSWR from 'swr'
import { fetcher } from '@/helpers/constants'
import Products from '../(templates)/Products'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {

    const searchParams = useSearchParams()
    const search = searchParams.get("page")

    let page = 0
    if (search) {
        if (Number(search) >= 0) {
            page = Number(search)
        }
    }
    if (page > 0) {
        page = page - 1
    }

    let prev = 0
    let next = 0

    const { data:productsCount, error:productsCountError, isLoading: productsCountIsLoading} = useSWR(`/api/productsCount`, fetcher)
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

    return (
        <div>
            <Products data={productsData}/>
            <div className='mt-5'>
                <ul className='flex'>
                    {pagination(productsCount.count)}
                </ul>
            </div>
        </div>
    )
}

export default Home

//className="border-2 px-3 py-1 cursor-pointer"