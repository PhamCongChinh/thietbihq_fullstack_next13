import { accessTokenSecret } from "@/helpers/constants"
import { EncryptJWT, JWTPayload, SignJWT, base64url, jwtDecrypt, jwtVerify } from "jose"

const secret1 = base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI')

//const signAccessToken = async (payload: JWTPayload, secret: string) => {
const signAccessToken = async (payload: JWTPayload, secret: string) => {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 30 // expired access token
    /*const jwt =  await new SignJWT({ payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret))*/

    const jwt = await new EncryptJWT({ payload })
        .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        //.setSubject(payload)
        .encrypt(secret1)
    return jwt
}

const signRefreshToken = async ( payload: JWTPayload, secret: string) => {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 60 * 2 // expired refresh token
    /*const jwt = new SignJWT({ payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret))*/
    const jwt = await new EncryptJWT({ payload })
        .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .encrypt(secret1)
    return jwt
}

const verify = async (token: string, secret: any) => {
    /*let payload
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(secret))
        payload = verified.payload
    } catch (error) {
        console.log(error)
    }
    console.log("payload in jwtSignVerify:", payload)
    return payload*/
    let payload
    try {
        const verified = await jwtDecrypt(token, secret1)
        payload = verified.payload
    } catch (error: any) {
        console.log(error)
        return error.code
    }
    return payload
}

export {
    signAccessToken, verify, signRefreshToken
}