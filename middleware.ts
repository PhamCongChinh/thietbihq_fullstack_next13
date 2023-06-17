import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { verify } from './utils/auth/jwtSignVerify'
import { decodeJwt } from 'jose'
import { accessTokenSecret, fetcher, refreshTokenSecret } from './helpers/constants'

export async function middleware(request: NextRequest) {
    console.log("-------Middleware--------")
    let ip = request.ip ?? request.headers.get('x-real-ip')
    const forwardedFor = request.headers.get('x-forwarded-for')
    if(!ip && forwardedFor){
        ip = forwardedFor.split(',').at(0) ?? 'Unknown'
    }
    //console.log("IP:", ip)

    const requestHeaders = new Headers(request.headers)
    console.log(requestHeaders.get("cookie"))

    const token = request.cookies.get('token')?.value
    console.log('Token in Cookies:', token)
    
    const loginURL = new URL('/login', request.url)

    if (token !== undefined) {
        try {
            const payload_access_token = await verify(token, accessTokenSecret!)
            console.log("Payload in middleware: ", payload_access_token)
            return NextResponse.next()
        } catch (error: any) {
            console.log("Token is expired! \n")
            if (error.code === 'ERR_JWT_EXPIRED') {
                const claims = decodeJwt(token)
                console.log("Claims: ", claims.payload)
                // Lay thong tin user
                /*const user = await fetch(`http://localhost:3000/api/users/${claims.payload}`, {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                })
                const userData = await user.json()
                console.log("userData:", userData.user[0].refreshToken)
                try {
                    const payloadRefreshToken = await verify(userData.user[0].refreshToken, refreshTokenSecret!)
                    console.log("Payload of refresh token:", payloadRefreshToken)
                    const newAccessToken = await fetch(`http://localhost:3000/api/refreshtoken`, {
                        method: 'POST',
                        body: JSON.stringify(payloadRefreshToken),
                        headers: { "Content-Type": "application/json" }
                    })
                    const result = await newAccessToken.json()
                    console.log("NEW FRESHTOKEN:", result.token)
                    const response = NextResponse.next()
                    response.cookies.set('token', result.token)
                    return response
                } catch (error) {
                    const redirect = NextResponse.redirect(loginURL)
                    redirect.cookies.delete('token')
                    await fetch(`UPDATE user SET refreshToken = ''`)
                    return redirect
                }*/
            }else{
                return NextResponse.next()
                //return NextResponse.redirect(loginURL)        
            }
        }
    }else{
        return NextResponse.next()
        //return NextResponse.redirect(loginURL)
    }
}

export const config = {
    matcher: [
        '/dashboard',
        '/dashboard/:path*',
        //'/api/:function*'
    ],
}