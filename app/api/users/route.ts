import query from "@/config/dbconfig"
import { NextResponse } from "next/server"

export async function GET(request: Request) {

    const payload = request.headers.get('cookie')
    console.log("payload in get User", payload)

    const users = await query( 'SELECT * FROM `user`', [] )
    console.log(users)
    return NextResponse.json({ users })
}
