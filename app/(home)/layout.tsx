import Footer from "@/components/layouts/footer"
import Navbar from "@/components/layouts/navbar"
import Sidebar from "@/components/layouts/sidebar"
import SidebarRight from "@/components/layouts/sidebar-right"
import Link from "next/link"

import Image from "next/image"
import Banner from '../../public/images/banner.jpeg'


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
            <div className="max-w-screen-xl flex flex-row mx-auto my-4 bg-slate-100">
                <div className="hidden md:block basis-0 lg:basis-1/5 bg-white"><Sidebar/></div>
                <div className="basis-full lg:basis-4/5 bg-white">
                    <div>
                        <Image src={Banner} alt={"Banner"} priority />
                    </div>
                    <div className="flex flex-row">
                        <div className="basis-full lg:basis-3/4">{children}</div>
                        <div className="basis-0 lg:basis-1/4"><SidebarRight/></div>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>
    )
}
