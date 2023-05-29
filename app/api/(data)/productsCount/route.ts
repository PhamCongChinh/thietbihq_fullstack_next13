import query from "@/config/dbconfig"
import { NextRequest, NextResponse } from "next/server"

const GET = async(request: NextRequest) => {
    const [ data ] = await query(`SELECT count(id) AS count FROM product`, [])
    return NextResponse.json(data)
}

export { GET }