'use client'

import Link from "next/link"
import Image from "next/image"
import Logo from '../../public/images/logo.png'
import { useParams, usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const Navbar = () => {

    const router = useRouter()
    const params = useParams()
    const pathname = usePathname()
    console.log("Router:", router)
    console.log("Params:", params)
    console.log("PathName:", pathname)

    const [menubar, setMenubar] = useState(false)

    return (
        <nav className="bg-white">
            <div className="fixed bg-gray-100 w-full top-0 left-0 z-20 border-b">
                <div className="container flex flex-wrap items-center justify-between mx-auto p-2 w-full">
                    <div className="hidden md:block">
                        <Link href={`/`}>HQ</Link>
                    </div>
                    <div className="block md:hidden">
                        <div onClick={() => setMenubar(!menubar)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>
                    </div>
                    <div>ABCDEF</div>
                </div>
            </div>
            <div className="container mx-auto mt-8 py-2 md:grid grid-cols-5">
                <div className="flex justify-center items-center">
                    <Image src={Logo} alt={"Logo"} width={120} height={120} priority />
                </div>
                <div className="relative col-span-3">
                    <form action="">
                        <input type="search" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-200 border-l-2 border border-gray-300 focus:ring-0 focus:ring-blue-200 focus:border-blue-200" placeholder="Tim kiem" required />
                        <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-blue-300">
                            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center">Lien he voi tao</div>
            </div>
            <div className="hidden w-full md:block bg-gray-100">
                <div className="container flex flex-wrap items-center justify-between mx-auto p-2">
                    <ul className="flex">
                        <li className="pr-3"><Link href={`/`}>Trchu</Link></li>
                        <li className="px-3"><Link href={`/tin-tuc`}>inuc</Link></li>
                        <li className="px-3"><Link href={`/san-pham`}>Sphasd</Link></li>
                    </ul>
                </div>
            </div>
            <div className="bg-slate-500">
                <div className="container mx-auto">
                    {pathname}
                </div>
            </div>

            {menubar ? (
                <div className="fixed top-0 left-0 w-60 h-full z-10 bg-white md:hidden">
                    <ul className="mt-12">
                        <li>ABC</li>
                        <li>ABC</li>
                        <li>ABC</li>
                        <li>ABC</li>
                        <li>ABC</li>
                        <li>ABC</li>
                        <li>ABC</li>
                        <li>ABC</li>
                        <li>ABC</li>
                        <li>ABC</li>
                    </ul>
                </div>
            ):(<></>)}

        </nav>
    )
}

export default Navbar