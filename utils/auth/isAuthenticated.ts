import { base64url, decodeJwt, jwtDecrypt } from "jose"
import { verify } from "./jwtSignVerify"

const IsAuthenticated = async (token: any) => {
    console.log("IsAuthenticated:", token)
    const payload_access_token = await verify(token, 'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI')
    console.log("Payload in middleware: ", payload_access_token)
    if (payload_access_token === 'ERR_JWT_EXPIRED') {
        await fetch(`http://localhost:3000//api/users/admin`, {
            method: 'GET',
            headers: {Authentication: `Bearer ${token}`}
        })
        .then(resp => resp.json())
        .then(json => console.log(JSON.stringify(json)))
    }
}

export default IsAuthenticated