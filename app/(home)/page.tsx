'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import mabu from '../../public/images/mabu.jpeg'
import useSWR from 'swr'
import { fetcher } from '@/helpers/constants'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {

    const { data, error, isLoading } = useSWR(`/api/products`, fetcher)
    console.log(data)
    if (error) return <div>Error</div>
    if (isLoading) return <div>Loading...</div>
    //max-w-screen-xl flex flex-wrap items-center justify-between mx-auto
    return (
        <div className="">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {data?.map((item: any) => {
                    return (
                        <div key={item.id}>
                            <Link href={`/${item.slug_category}/${item.slug}`}>
                                <Image src={`/images/products/${item.image}`} width={200} height={200} alt="Picture of the author" priority />
                            </Link>
                        </div>
                    )
                })}
            </div>
            <div className='w-full my-4'>
                <ul className='flex flex-row justify-center'>
                    <li className='border-2 px-3 py-1 cursor-pointer'>1</li>
                    <li className='border-2 px-3 py-1 cursor-pointer'>2</li>
                    <li className='border-2 px-3 py-1 cursor-pointer'>3</li>
                    <li className='border-2 px-3 py-1 cursor-pointer'>4</li>
                    <li className='border-2 px-3 py-1 cursor-pointer'>5</li>
                    <li className='border-2 px-3 py-1 cursor-pointer'>6</li>
                </ul>
            </div>
        </div>
    )
}

export default Home