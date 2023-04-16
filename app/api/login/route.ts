import query from "@/config/dbconfig"
import { signAccessToken } from "@/utils/auth/jwtSignVerify"
import { NextResponse } from "next/server"

const secret_access_token = process.env.SECRET_ACCESS_TOKEN

export async function GET(request: Request) {
    const users = await query(
        'SELECT * FROM `user`', [] 
    )
    console.log(secret_access_token)
    return NextResponse.json({ users })
}

export async function POST(request: Request) {
    const res = await request.json() //{ username: 'admin', password: 'admin' }
    const username =  res.username
    const password = res.password
    const [userCount] = await query('SELECT COUNT(*) AS COUNT FROM user WHERE username = ? AND password = ?', [username, password])
    console.log("So luong username va password ton tai: ", userCount)

    
    if (userCount.COUNT > 0) {
        const accessToken = await signAccessToken(username, secret_access_token)
        console.log("accessToken tao ra luu vao cookie tren webpage: ", accessToken)
        let response = new NextResponse()
        response.cookies.set('token', accessToken, {
            secure: true,
            sameSite: "strict",
            maxAge: 60,
            httpOnly: true,
            path: "/",
        })
        return response
    }else{
        return new NextResponse('Unsuccess', {status: 500})
    }

    /*if(res.username == 'admin'){
        const accessToken = await signAccessToken(res.username, secret_access_token as string)
        const serialised = cookie.serialize('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60,
            path: "/"
        })
        console.log(accessToken)
        response.cookies.set('token', serialised), {
        }
    }*/
    
}