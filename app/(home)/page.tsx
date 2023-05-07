
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
        </div>
    )
}

export default Home