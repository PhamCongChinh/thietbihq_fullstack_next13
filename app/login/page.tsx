'use client'

//import axios from "axios"

const Login = () => {

    const login = async (event: any) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        const data = {
            username: username,
            password: password
        }
        const url = 'http://localhost:3000/api/login'
        try {
            const response = await fetch(url, {
                method:'POST',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json()).then(res => console.log(res.data))
            //console.log(response)
        } catch (error) {
            console.log("faild 500")
        }
        
    }
    return(
        <form onSubmit={login}>
            <div>
                <label htmlFor="">Username</label>
                <input type="text" name="username"/>
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="text" name="password"/>
            </div>
            <button type="submit">Send</button>
        </form>
    )
}
export default Login