'use client'

import { useRouter } from "next/navigation"

const Login = () => {
    const router = useRouter()

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
            }
        })
        .catch((error) => console.log(error))
    }
    return (
        <div>
            <h4>Login</h4>
            <form onSubmit={login}>
                <div>
                    <label htmlFor="">Username</label>
                    <input type="text" name="username"/>
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="text" name="password"/>
                </div>
                <div><button type="submit">Send</button></div>
            </form>
        </div>
    )
}
export default Login