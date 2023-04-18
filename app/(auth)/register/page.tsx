'use client'

import { useState } from "react"

const Register = () => {

    const [loi, setLoi] = useState('')
    console.log(loi)
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

            console.log(response)
        }else{
            setLoi('Looi roi')
            console.log("Nhap lai")
        }
        

    }
    return (
            <div>
                <h4>Register</h4>
                <form onSubmit={register}>
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
                    <button type="submit">Send</button>
                </form>
            </div>
    )
}

export default Register