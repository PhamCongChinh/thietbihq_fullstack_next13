
import Image from 'next/image'
import { Inter } from 'next/font/google'
import anh1 from '../../public/images/anh1.jpg'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
    //max-w-screen-xl flex flex-wrap items-center justify-between mx-auto
    return (
        <div className="">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                <div>
                    <Image src={anh1} className='w-full' alt="Picture of the author" priority />
                </div>
                <div>
                    <Image src={anh1} className='w-full' alt="Picture of the author" priority />
                </div>
                <div>
                    <Image src={anh1} className='w-full' alt="Picture of the author" priority />
                </div>
                <div>
                    <Image src={anh1} className='w-full' alt="Picture of the author" priority />
                </div>
                <div>
                    <Image src={anh1} className='w-full' alt="Picture of the author" priority />
                </div>
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