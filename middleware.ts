import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { verify } from './utils/auth/jwtSignVerify'
import { decodeJwt } from 'jose'
import { accessTokenSecret, refreshTokenSecret } from './helpers/constants'

export async function middleware(request: NextRequest) {

    let ip = request.ip ?? request.headers.get('x-real-ip')
    const forwardedFor = request.headers.get('x-forwarded-for')
    if(!ip && forwardedFor){
        ip = forwardedFor.split(',').at(0) ?? 'Unknown'
    }
    //console.log("IP:", ip)

    const token = request.cookies.get('token')?.value
    
    const loginURL = new URL('/login', request.url)
    if (token !== undefined) {
        try {
            const payload_access_token = await verify(token, accessTokenSecret!)
            console.log("Payload in middleware: ", payload_access_token)
            return NextResponse.next()
        } catch (error: any) {
            console.log("Token is expired! \n", error)
            if (error.code === 'ERR_JWT_EXPIRED') {
                const claims = decodeJwt(token)
                console.log("Claims: ", claims.payload)
                const user = await fetch(`http://localhost:3000/api/users/${claims.payload}`, {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                })
                const userData = await user.json()
                console.log("userData:", userData.user[0].refreshToken)
                try {
                    const payloadRefreshToken = await verify(userData.user[0].refreshToken, refreshTokenSecret!)
                    console.log("Payload of refresh token:", payloadRefreshToken.payload)
                    const newAccessToken = await fetch(`http://localhost:3000/api/refreshtoken`, {
                        method: 'POST',
                        body: JSON.stringify(payloadRefreshToken.payload),
                        headers: { "Content-Type": "application/json" }
                    })
                    const result = await newAccessToken.json()
                    console.log(result.token)
                    const response = NextResponse.next()
                    response.cookies.set('token', result.token)
                    return response
                } catch (error) {
                    const redirect = NextResponse.redirect(loginURL)
                    redirect.cookies.delete('token')
                    return redirect
                }
            }else{
                return NextResponse.redirect(loginURL)        
            }
        }
    }else{
        return NextResponse.redirect(loginURL)
    }
}

export const config = {
    matcher: [
        '/dashboard',
        '/dashboard/:path*',
        //'/api/:function*'
    ],
}