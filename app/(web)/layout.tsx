import Footer from "@/components/layouts/footer"
import Navbar from "@/components/layouts/navbar"
import SidebarLayout from "@/components/layouts/sidebar"
import SidebarRight from "@/components/layouts/sidebar-right"

export const metadata = {
    title: 'Thiết bị HQ',
    description: 'Công ty TNHH thương mại và sản xuất HQ',
}

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {    
    return (
        <section>
            <Navbar/>
            <div className="container mx-auto bg-white w-full grid md:grid-cols-5">
                <div className="hidden md:block"><SidebarLayout/></div>
                <div className="col-span-5 md:col-span-3">{children}</div>
                <div className="hidden md:block"><SidebarRight/></div>
            </div>
            <Footer/>
        </section>
    )
}
