'use client'
import { cookies } from 'next/headers'
const Logout = () => {
    const cookieStore = cookies()
    const theme = cookieStore.get('token')
    console.log("cookie client:", theme)
    return (
        <div>
            <button >Logout</button>
        </div>
    )
}
export default Logout