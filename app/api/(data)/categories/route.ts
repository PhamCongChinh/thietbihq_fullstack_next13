import query from "@/config/dbconfig"
import { NextRequest, NextResponse } from "next/server"

const GET = async (request: NextRequest) => {
    const categories = await query('SELECT * FROM category', [])
    return NextResponse.json(categories)
}

const POST = async (request: NextRequest) => {
    const res = await request.json()
    await query(`INSERT INTO category (id, name, slug) VALUES (?, ?, ?)`, [null, res.category_name, res.category_slug])
    return NextResponse.json({message: 'Thanh cong'})
}

const DELETE = async (request: NextRequest) => {
    const res = await request.json()
    console.log("Delete:", res)
    return NextResponse.json({message: 'Thanh cong'})
}

export { GET, POST, DELETE }