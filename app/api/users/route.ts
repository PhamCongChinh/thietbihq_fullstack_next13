import query from "@/config/dbconfig"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const users = await query( 'SELECT * FROM `user`', [] )
    console.log(users)
    return NextResponse.json({ users })
}
