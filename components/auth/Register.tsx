'use client'

import api from "@/config/axiosconfig"
import { ToastContainer, toast } from "react-toastify"

const Register = () => {

    const register = async (event: any) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        const repassword = event.target.repassword.value
        
        if (password === repassword) {
            const formData = new FormData()
            formData.append("username", username)
            formData.append("password", password)
            formData.append("repassword", repassword)
            console.log("Register:", formData)
            return await api.post(`/api/auth/register`, formData)
            .then(res => {
                if (res.data.status == "0" && res.data.ecode == "00") {
                    toast("Tao tai khoan thành công", { hideProgressBar: true, autoClose: 2000, type: 'success' })
                }else{
                    toast("Tao tai khoan that bai", { hideProgressBar: true, autoClose: 2000, type: 'error' })
                }
            })
        }else{
            toast.error("Mat khau khong trung!")
        }
    }
    return (
        <section className="bg-gray-100">
            <ToastContainer/>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                            Đăng ký tài khoản
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={register}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Tài khoản</label>
                                <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Tài khoản"/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu</label>
                                <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Mật khẩu"/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Nhập lại mật khẩu</label>
                                <input type="password" name="repassword" id="repassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Nhập lại mật khẩu"/>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Đăng ký</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Register