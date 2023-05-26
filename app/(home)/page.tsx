'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import mabu from '../../public/images/mabu.jpeg'
import useSWR from 'swr'
import { fetcher } from '@/helpers/constants'
import Products from '../(templates)/Products'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
    const { data, error, isLoading } = useSWR(`/api/products`, fetcher)
    if (error) return <div>Error</div>
    if (isLoading) return <div>Loading...</div>
    return (
        <div className="">
            <Products data={data}/>
        </div>
    )
}

export default Home