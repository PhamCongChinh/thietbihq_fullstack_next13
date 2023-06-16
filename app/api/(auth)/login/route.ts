import query from "@/config/dbconfig"
import { signAccessToken, signRefreshToken } from "@/utils/auth/jwtSignVerify"
import { NextResponse } from "next/server"
import { NOTFOUND, SUCCESS, UNSUCCESS, accessTokenSecret, cryptoSecret, refreshTokenSecret } from "@/helpers/constants"
import { decrypt } from "@/helpers/crypto"

export async function GET(request: Request) {
    const users = await query( 'SELECT * FROM `user`', [] )
    console.log(users)
    return NextResponse.json({ users })
}

export async function POST(request: Request) {
    const res = await request.json() //{ username: 'admin', password: 'admin' }
    const username = res.username
    const password = res.password

    const [ data ] = await query(`SELECT password FROM user WHERE username = ?`, [username])
    console.log("Password is crypted", data)
    if (data) {
        const originalPassword = await decrypt(data.password, cryptoSecret!)
        console.log("OriginalPassword:", originalPassword)
        if (password === originalPassword) {
            const accessToken = await signAccessToken(username, accessTokenSecret!)
            console.log("token is stored in cookie webpage: ", accessToken)
            const response = NextResponse.json(SUCCESS)
            response.cookies.set('token', accessToken, {
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60,
                httpOnly: true,
                path: "/",
            })

            const refreshToken = await signRefreshToken(username, refreshTokenSecret!)
            console.log("refreshToken is stored in database: ", refreshToken)
            await query(`UPDATE user SET refreshToken = '`+ refreshToken +`' WHERE username = ?`, [username])
            return response
        }else{
            return NextResponse.json(UNSUCCESS)
        }
    }else{
        return NextResponse.json(NOTFOUND)
    }
}

/*console.log("data", data)
    const [userCount] = await query('SELECT COUNT(*) AS COUNT FROM user WHERE username = ? AND password = ?', [username, null])
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
    }*/

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