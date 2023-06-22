import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { verify } from './utils/auth/jwtSignVerify'
import { base64url, decodeJwt, decodeProtectedHeader, jwtDecrypt } from 'jose'
import { accessTokenSecret, fetcher, refreshTokenSecret } from './helpers/constants'

const secret = base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI')

let redirectToLogin = false

export async function middleware(request: NextRequest) {
    console.log("-------Middleware--------")
    let ip = request.ip ?? request.headers.get('x-real-ip')
    const forwardedFor = request.headers.get('x-forwarded-for')
    if(!ip && forwardedFor){
        ip = forwardedFor.split(',').at(0) ?? 'Unknown'
    }
    //console.log("IP:", ip)

    let token : string | undefined

    if (request.cookies.has("token")) {
        token = request.cookies.get('token')?.value
        console.log("Token cookies:", token)
    } else if (request.headers.get("Authorization")?.startsWith("Bearer ")) {
        token = request.headers.get("Authorization")?.substring(7)
        console.log("Token header:", token)
    }
    //B1
    console.log('Token in APP:', token)

    if (request.nextUrl.pathname.startsWith("/login") && (!token || redirectToLogin)){
        return
    }


    const response = NextResponse.next()
    try {
        if (token) {
            const { sub } = await verify<{sub:string}>(token)
            console.log("sub", sub)
            response.headers.set("X-USER-ID", sub)
        }
    } catch (error) {
        redirectToLogin = true
        if (request.nextUrl.pathname.startsWith("/api")) {
            return ({401: "Token is invalid or user doesn't exists"});
          }
          return NextResponse.redirect(
            new URL(`/login?${new URLSearchParams({ error: "badauth" })}`, request.url)
          )
    }

    
    /*const requestHeaders = new Headers(request.headers)
    requestHeaders.set('Authentication', token!)
    
    const loginURL = new URL('/login', request.url)

    if (token === undefined) {
        return NextResponse.redirect(loginURL)
    }else{
        const payload_access_token = await verify(token, 'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI')
        console.log("Payload in middleware: ", payload_access_token)
        const response = NextResponse.next()
        response.headers.set('x-hello-from-middleware2', token!)

        return response
    }*/

    //IsAuthenticated(token)
    
    
    /*const response = NextResponse.next({
        request: {
            headers: requestHeaders
        }
    })*/
    
    /*if (token !== undefined) {
        try {
            const payload_access_token = await verify(token, 'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI')
            console.log("Payload in middleware: ", payload_access_token)
            return NextResponse.next()
        } catch (error: any) {
            console.log("Token is expired! \n")
            if (error.code === 'ERR_JWT_EXPIRED') {
                const response = NextResponse.next()
                response.cookies.set('token', token)
                
                return response
                //const claims = decodeJwt(token)
                //const claims = await jwtDecrypt(token, secret)
                //console.log("Claims: ", claims.payload)
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
            /*}else{
                return NextResponse.redirect(loginURL)        
            }
        }
    }else{
        return NextResponse.redirect(loginURL)
    }*/
}

export const config = {
    matcher: [
        '/dashboard',
        '/dashboard/:path*',
        '/api/data/:path*',
        '/profile'
    ],
}