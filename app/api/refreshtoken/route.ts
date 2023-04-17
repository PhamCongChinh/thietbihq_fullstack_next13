import query from "@/config/dbconfig"
import { signAccessToken } from "@/utils/auth/jwtSignVerify"
import { NextRequest, NextResponse } from "next/server"


const secret_access_token = process.env.SECRET_ACCESS_TOKEN!


const GET = async (request: Request) => {
    return NextResponse.json({ })
}
const POST = async (request: Request) => {
    const res = await request.json()
    console.log("Res of refresh token:", res)
    const token = await signAccessToken(res, secret_access_token)
    console.log("Token after:",token)
    return NextResponse.json({ token })
}

export {
    GET, POST
}