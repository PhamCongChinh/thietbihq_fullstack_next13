'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import mabu from '../../public/images/mabu.jpeg'
import useSWR from 'swr'
import { fetcher } from '@/helpers/constants'
import Products from '../(templates)/Products'
import { useSearchParams } from 'next/navigation'

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
    
    const { data, error, isLoading } = useSWR(`/api/productsPerPage?page=${page}`, fetcher)
    if (error) return <div>Error</div>
    if (isLoading) return <div>Loading...</div>
    return (
        <div>
            <Products data={data}/>
            <div className='mt-5'>
                <Link href={`/?page=${1}`} className='border-2 p-4'>1</Link>
                <Link href={`/?page=${2}`} className='border-2 p-4'>2</Link>
                <Link href={`/?page=${3}`} className='border-2 p-4'>3</Link>
                <Link href={`/?page=${4}`} className='border-2 p-4'>4</Link>
            </div>
        </div>
    )
}

export default Home