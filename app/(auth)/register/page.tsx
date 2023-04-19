'use client'

import { useState } from "react"

const Register = () => {

    const [message, setMessage] = useState('')
    const register = async (event: any) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        const repassword = event.target.repassword.value
        if (password === repassword) {
            const data = {
                username : username,
                password : password,
                repassword : repassword
            }
            console.log("Register:", data)
            const url = 'http://localhost:3000/api/register'
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const { message } = await response.json()
            console.log("response: ", message)
            if (message === 'SUCCESS') {
                setMessage('Bạn đã đăng ký thành công!')
            }else{
                setMessage('Bạn đã đăng ký thất bại!')
            }
        }else{
            setMessage('Looi roi')
        }
    }
    return (
        <div>
            <h4 className="text-orange-600">Register</h4>
            {message}
            <form onSubmit={register} className="bg-slate-300 max-w-sm justify-center">
                <div>
                    <label htmlFor="">Username</label>
                    <input type="text" name="username" />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="text" name="password" />
                </div>
                <div>
                    <label htmlFor="">Re Password</label>
                    <input type="text" name="repassword" />
                </div>
                <button type="submit" className="bg-orange-500">Send</button>
            </form>
        </div>
    )
}

export default Register