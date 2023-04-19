'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

const Login = () => {

    const router = useRouter()
    const [message, setMessage] = useState('')
    const login = async (event: any) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        const data = {
            username: username,
            password: password
        }
        const url = 'http://localhost:3000/api/login'

        await fetch(url, {
            method:'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        .then((res) => res.json())
        .then((res) => {
            console.log('Login: ', res.message)
            if (res.message === 'SUCCESS') {
                router.push('/dashboard')
            }else{
                router.push('/login')
                setMessage('Đăng nhập thất bại!')
            }
        })
        .catch((error) => console.log(error))
    }

    let err
    if (message) {
        err = <p className="bg-red-500 p-2">x {message}</p>
    }

    return (
        <section className="bg-gray-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                            Đăng nhập tài khoản
                        </h1>
                        {err}
                        <form className="space-y-4 md:space-y-6" onSubmit={login}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Tài khoản</label>
                                <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Tài khoản"/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu</label>
                                <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Mật khẩu"/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500">Nhớ mật khẩu</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Quên mật khẩu?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Đăng nhập</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login