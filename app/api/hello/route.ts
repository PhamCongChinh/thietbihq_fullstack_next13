import query from "@/config/dbconfig"
import { NextRequest, NextResponse } from "next/server"

const GET = async (request: Request) => {
    const users = await query(
        'SELECT * FROM `user`', [] 
    )
    return NextResponse.json({ users })
}
const POST = async (request: Request) => {
    const res = await request.json();
    console.log(res)
    return NextResponse.json({ res })
}

export {
    GET, POST
}