import Link from "next/link"

const Footer = () => {
    return (
        <div className="bg-blue-500 text-white p-4 border-t">
            <div className="max-w-6xl mx-auto grid grid-flow-row auto-rows-max md:grid-cols-2">
                <div className="grid-cols-1">
                    <div>
                        <p className="py-4 font-semibold">CÔNG TY TNHH THƯƠNG MẠI VÀ SẢN XUẤT HQ VIỆT NAM</p>
                    </div>
                    <div>
                        <p className="text-sm"><span className="font-semibold">
                            Website</span> : <Link href={`https://thietbihq.com`} className="underline">https://thietbihq.com</Link>
                        </p>
                    </div>
                    <div className="text-sm pt-4">
                        <p className="text-sm font-semibold">Trụ sở chính</p>
                        <p className="">Địa chỉ: xóm 4 - Xuân Hồng - Xuân Trường - Nam Định</p>
                        <p className="">Điện thoại : 0915 172 333</p>
                    </div>
                    <div className="text-sm pt-4">
                        <p className="font-semibold">Chi nhánh 1</p>
                        <p className="">Địa chỉ : 66 Tân Mai - Hoàng Mai - Hà Nội</p>
                        <p className="">Điện thoại : 0979 342 589 (Mr Quyền)</p>
                    </div>
                    <div className="text-sm pt-4">
                        <p className="font-semibold">Chi nhánh 2</p>
                        <p className="">Địa chỉ : Cầu 50 - Xuân Thượng - Xuân Trường - Nam Định</p>
                        <p className="">Điện thoại : 0965 990 555 (Mr Hương)</p>
                    </div>
                </div>
                <div className="grid-cols-1">
                    <p className="py-4 font-semibold ">Kết nối với chúng tôi</p>
                    <div className="flex flex-row gap-x-2">
                        <svg className="p-1 h-8 w-8 rounded cursor-pointer bg-blue-700 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                        <svg className="p-1 h-8 w-8 rounded cursor-pointer bg-red-500 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer