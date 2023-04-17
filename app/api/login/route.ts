import query from "@/config/dbconfig"
import { signAccessToken, signRefreshToken } from "@/utils/auth/jwtSignVerify"
import { NextResponse } from "next/server"
import { SUCCESS, UNSUCCESS } from "@/helpers/constants"

const secret_access_token = process.env.SECRET_ACCESS_TOKEN!
const secret_refresh_token = process.env.SECRET_REFRESH_TOKEN!

export async function GET(request: Request) {
    const users = await query( 'SELECT * FROM `user`', [] )
    console.log(secret_access_token)
    return NextResponse.json({ users })
}

export async function POST(request: Request) {
    const res = await request.json() //{ username: 'admin', password: 'admin' }
    const username = res.username
    const password = res.password
    const [userCount] = await query('SELECT COUNT(*) AS COUNT FROM user WHERE username = ? AND password = ?', [username, password])
    console.log("So luong username va password ton tai: ", userCount)
    
    if (userCount.COUNT > 0) {
        const accessToken = await signAccessToken(username, secret_access_token)
        console.log("token is stored in cookie webpage: ", accessToken)
        const response = NextResponse.json({ message: SUCCESS })
        response.cookies.set('token', accessToken, {
            secure: true,
            sameSite: "strict",
            //maxAge: 60,
            httpOnly: true,
            path: "/",
        })

        const refreshToken = await signRefreshToken(username, secret_refresh_token)
        console.log("refreshToken is stored in database: ", refreshToken)
        await query(`UPDATE user SET refreshToken = '`+ refreshToken +`' WHERE username = ?`, [username])
        return response
    }else{
        return NextResponse.json({ message: UNSUCCESS })
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