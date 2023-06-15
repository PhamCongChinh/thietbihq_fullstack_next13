'use client'
import { useState } from "react"
import Image from "next/image"
import HotGirl from "@/public/images/hotgirl.jpeg"
const Profile = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleDropdown = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className="flex items-center">
                        <div className="flex items-center ml-3">
                            <div>
                                <button type="button" className="relative flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" onClick={handleDropdown}>
                                    <Image className="w-8 h-8 rounded-full" src={HotGirl} alt="user photo"/>
                                </button>
                            </div>

                            <div className={`absolute top-10 right-1 my-4 text-base list-none bg-white divide-gray-100 rounded shadow ${isOpen?"block":"hidden"}`}>
                                <div className="px-4 py-3">
                                    <p className="text-sm text-gray-900">
                                        Cong Chinh
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        ChinhPC@gmail.com
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        ChinhPC@gmail.com
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        ChinhPC@gmail.com
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        ChinhPC@gmail.com
                                    </p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
    )
}
export default Profile