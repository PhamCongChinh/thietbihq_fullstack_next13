import query from "@/config/dbconfig"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params } : {
    params: {slug: string}
}) {

    //const data = request.headers.get('Cookie')
    //console.log("Get User:", data)

    const slug = params.slug
    const user = await query( 'SELECT * FROM user WHERE username = ?', [slug] )
    return NextResponse.json({ user })
}

export async function PUT(request: Request, { params } : {
    params: {slug: string}
}) {
    const slug = params.slug
   // const user = await query( 'UPDATE * FROM user WHERE username = ?', [slug] )
    return NextResponse.json({ slug })
}


