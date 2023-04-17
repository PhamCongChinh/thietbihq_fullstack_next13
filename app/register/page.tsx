'use client'


const Register = () => {
    
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
            console.log("Nhap lai")
        }


    }
    return (
        <form onSubmit={register}>
            <div>
                <label htmlFor="">Username</label>
                <input type="text" name="username"/>
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="text" name="password"/>
            </div>
            <div>
                <label htmlFor="">Re Password</label>
                <input type="text" name="repassword"/>
            </div>
            <button type="submit">Send</button>
        </form>
    )
}

export default Register