import query from "@/config/dbconfig"
import { NextRequest, NextResponse } from "next/server"

const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')

    console.log(page)

    let pageNumber = 0
    if (Number(page) > 1) {
        pageNumber = Number(page) - 1
    }else{
        pageNumber = 0
    }
    const itemsPerPage = 1
    const pagesVisited = pageNumber * itemsPerPage
    const categories = await query('SELECT * FROM category LIMIT ?, ?', [String(pagesVisited), String(itemsPerPage)])
    const totalCategories = await query('SELECT COUNT(id) AS total FROM category', [])
    const results = {
        categories: categories,
        totalCategories: totalCategories
    }
    
    //const categories = await query('SELECT * FROM category', [])
    return NextResponse.json(results)
}

const POST = async (request: NextRequest) => {
    const res = await request.json()
    await query(`INSERT INTO category (id, name, slug) VALUES (?, ?, ?)`, [null, res.category_name, res.category_slug])
    return NextResponse.json({message: 'Thanh cong'})
}

export { GET, POST }