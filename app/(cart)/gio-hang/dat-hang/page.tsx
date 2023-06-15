'use client'

import Order from "@/components/templates/Order"
import { useAppSelector } from "@/redux/hook"
import { useEffect, useState } from "react"

interface ISendMail {
    name?: string,
    email?: string,
    phone?: string
    require?: string
}

const Page = () => {
    const cart = useAppSelector((state) => state.cart)
    const [cartItems, setCartItems] = useState([{id:0,quantity:0}])
    useEffect(() => {
        return setCartItems(cart)
    },[cart])

    const sendMail = (event: any) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("name", event.target.name.value)
        formData.append("email", event.target.email.value)
        formData.append("phone", event.target.phone.value)
        formData.append("require", event.target.require.value)
        
        console.log(formData.get("name"))
        console.log(formData.get("email"))
        console.log(formData.get("phone"))
        console.log(formData.get("require"))
    }
    return (
        <div className="grid p-3 md:grid-cols-2">
            <div className="md:grid grid-cols-1">
                <div className="flex items-center border-b-2">
                    <div className="w-2/3">
                        Sản phẩm
                    </div>
                    <div className="w-1/3">
                        <label className="block text-gray-500 text-right">
                            Số lượng
                        </label>
                    </div>
                </div>
                {cartItems?.map(item => (
                    <div className="flex items-center" key={item.id}>
                        <div className="w-2/3">
                            <Order data={item.id}/>
                        </div>
                        <div className="w-1/3">
                            <label className="block text-gray-500 text-right">
                                x{item.quantity}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <div className="md:grid grid-cols-1">
                <form className="w-full max-w-2xl" onSubmit={sendMail}>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Họ tên <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <div className="md:w-3/4">
                            <input name="name" className="border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Email <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <div className="md:w-3/4">
                            <input 
                                name="email" 
                                className="border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Số điện thoại <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <div className="md:w-3/4">
                            <input
                                name="phone"
                                className="border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/4">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Yêu cầu
                            </label>
                        </div>
                        <div className="md:w-3/4">
                            <textarea 
                                rows={5}
                                name="require"
                                className="border border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Write your thoughts here..."></textarea>
                        </div>
                    </div>
                    <div className="bg-slate-500">
                        <button type="submit" className="float-right bg-blue-400 text-white px-3 py-2 rounded">Xac nhan</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Page