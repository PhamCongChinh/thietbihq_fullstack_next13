import Footer from "@/components/layouts/footer"
import Navbar from "@/components/layouts/navbar"
import Sidebar from "@/components/layouts/sidebar"
import SidebarRight from "@/components/layouts/sidebar-right"
import Link from "next/link"

export const metadata = {
    title: 'Thiết bị HQ',
    description: 'Generated by create next app',
}

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {    
    return (
        <section>
            <Navbar/>
            <div className="max-w-screen-xl flex flex-row mx-auto my-4 bg-slate-100">
                <div className="basis-1/5 bg-slate-200"><Sidebar/></div>
                <div className="basis-3/5">{children}</div>
                <div className="basis-1/5"><SidebarRight/></div>
            </div>
            <Footer/>
            
        </section>
    )
}
