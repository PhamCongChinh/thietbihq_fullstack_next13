import Footer from "@/components/layouts/footer"
import Navbar from "@/components/layouts/navbar"
import Sidebar from "@/components/layouts/sidebar"
import SidebarRight from "@/components/layouts/sidebar-right"
import Link from "next/link"

import Image from "next/image"
import Banner from '../../public/images/banner.png'

export const metadata = {
    title: 'Thiết bị HQ',
    description: 'Generated by create next app',
}

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <Navbar/>
            <div className="container mx-auto bg-white w-full grid md:grid-cols-5">
                <div className="hidden md:block"><Sidebar/></div>
                <div className="p-1 md:col-span-4">
                    <div>
                        <Image src={Banner} alt={"Banner"} className="w-full h-auto" placeholder="blur"/>
                    </div>
                    <div className="grid grid-cols-4">
                        <div className="col-span-4 md:col-span-3">{children}</div>
                        <div className="bg-slate-200 hidden md:block"><SidebarRight/></div>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>
    )
}
