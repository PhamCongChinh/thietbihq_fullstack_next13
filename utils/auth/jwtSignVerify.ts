import { JWTPayload, SignJWT, jwtVerify } from "jose"

const signAccessToken = async (payload: JWTPayload, secret: string) => {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 30 // expired access token
    const jwt =  await new SignJWT({ payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret))
    return jwt
}

const signRefreshToken = async ( payload: JWTPayload, secret: string) => {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 60 * 2 // expired refresh token
    const jwt = new SignJWT({ payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret))
    return jwt
}

const verify = async (token: string, secret: string) => {
    let payload
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(secret))
        payload = verified.payload
    } catch (error) {
        console.log(error)
    }
    console.log("payload in jwtSignVerify:", payload)
    return payload
}

export {
    signAccessToken, verify, signRefreshToken
}