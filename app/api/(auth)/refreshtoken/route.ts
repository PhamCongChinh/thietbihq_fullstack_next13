import query from "@/config/dbconfig"
import { accessTokenSecret } from "@/helpers/constants"
import { signAccessToken } from "@/utils/auth/jwtSignVerify"
import { NextRequest, NextResponse } from "next/server"

const GET = async (request: Request) => {
    return NextResponse.json({ })
}
const POST = async (request: Request) => {
    const res = await request.json()
    console.log("Res of refresh token:", res)
    const token = await signAccessToken(res, accessTokenSecret!)
    console.log("Token after:",token)
    return NextResponse.json({ token })
}

export {
    GET, POST
}