import Footer from "@/components/layouts/footer"
import Navbar from "@/components/layouts/navbar"
import Sidebar from "@/components/layouts/sidebar"
import SidebarRight from "@/components/layouts/sidebar-right"

import Banner from "@/components/templates/Banner"

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
            
            <div className="container mx-auto bg-white w-full grid md:grid-cols-5 my-3">
                <div className="hidden md:block"></div>
                <div className="p-1 md:col-span-4">
                    <Banner/>
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
