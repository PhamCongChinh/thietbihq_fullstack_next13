import query from "@/config/dbconfig"
import { NextRequest, NextResponse } from "next/server"

const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    console.log(page)

    const itemsPerPage = 3
    //const pagesVisited = Number(page) * itemsPerPage
    //const pageCount = Math.ceil(data.length/itemsPerPage)
    // C1
    const categories = await query('SELECT * FROM category WHERE id BETWEEN 5 AND 17', [])
    console.log(categories)


    // C2: select all
    //const categories = await query('SELECT * FROM category', [])
    return NextResponse.json(categories)
}

const POST = async (request: NextRequest) => {
    const res = await request.json()
    await query(`INSERT INTO category (id, name, slug) VALUES (?, ?, ?)`, [null, res.category_name, res.category_slug])
    return NextResponse.json({message: 'Thanh cong'})
}

export { GET, POST }