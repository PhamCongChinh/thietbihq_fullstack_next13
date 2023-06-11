import Image from "next/image"
import AddToCart from "../templates/AddToCart"

const Product = (props : any) => {
    const data = props.data
    console.log("data", data)
    return (
        <div>
            {data.map((item: any) => (
                <div key={item.id} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="bg-slate-700">
                        <Image 
                            src={`/images/products/${item.image}`}
                            height={300}
                            width={300}
                            alt={`${item.name}`}
                            priority/>
                    </div>
                    <div className="">
                        <div className="border-b pb-3">
                            <h1 className="text-2xl">{item.name}</h1>
                        </div>
                        <div className="pt-3">
                            <p className="text-sm">Mã hàng : {item.code}</p>
                            <p className="text-sm">Giá : <span className="font-semibold text-red-500">Liên hệ</span></p>
                        </div>
                        <div className="pt-3">
                            <p className="text-sm">Bảo hành : 12 tháng</p>
                            <p className="text-sm">Giao hàng</p>
                            <ul className="text-sm">
                                <li className="">- Giao hàng</li>
                                <li>- Thời gian làm việc từ <span className="text-blue-500">8h30</span> đến <span className="text-blue-500">18h30</span> hằng ngày</li>
                            </ul>
                        </div>
                        <div className="pt-3">
                            <p className="text-sm">Liên hệ mua hàng:</p>
                            <p className="font-semibold text-sm text-gray-700">Nam Định : <span className="text-red-500">0965 990 555</span></p>
                            <p className="font-semibold text-sm text-gray-700">Hà Nội : <span className="text-red-500">0979 342 589</span></p>
                        </div>


                        <div className="mt-6 flex">
                            <AddToCart data={item.id}/>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="border-b pb-2">
                            <p className="text-gray-600 font-semibold">Thông tin chi tiết</p>
                        </div>
                        <div className="py-4 text-gray-800 text-sm leading-6" dangerouslySetInnerHTML={{ __html: item.content}} />
                    </div>
                </div>
            ))}
            
        </div>
    )
}

export default Product