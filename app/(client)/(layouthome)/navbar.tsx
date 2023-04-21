import Link from "next/link"
import Image from "next/image"
import Logo from '../../../public/images/logo.png'
const Navbar = () => {
    return (
        <nav>
            <div className="bg-blue-500 border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                    <div>Công ty TNHH Thương mại và sản xuất HQ</div>
                    <div>Đăng nhập</div>
                </div>
            </div>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                <div className="basis-1/5"><Image src={Logo} alt={"Logo"} priority /></div>
                <div className="basis-3/5 relative w-full">
                    <input type="search" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-200 border-l-2 border border-gray-300 focus:ring-0 focus:ring-blue-200 focus:border-blue-200" placeholder="Tim kiem" required />
                    <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-blue-300">
                        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
                <div className="basis-1/5">HAhsd</div>
            </div>
            <div className="bg-blue-500 border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                    <ul className="flex">
                        <li>Trang chủ</li>
                        <li>Tin tức</li>
                        <li>Trang chủ</li>
                        <li>Trang chủ</li>
                        <li>Trang chủ</li>
                        <li>Trang chủ</li>
                        <li>Trang chủ</li>
                        <li>Trang chủ</li>
                        <li>Trang chủ</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar