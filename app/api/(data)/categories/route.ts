import query from "@/config/dbconfig"
import { SUCCESS, UNSUCCESS } from "@/helpers/constants"
import { NextRequest, NextResponse } from "next/server"

// Get All
const GET = async (request: NextRequest) => {
    let data = []
    try {
        data = await query(`SELECT * FROM category`, [])
    } catch (error) {
        console.log(error)
        return NextResponse.json(UNSUCCESS)
    }
    return NextResponse.json(data)
}

// Create
const POST = async (request: NextRequest) => {
    const res = await request.json()
    try {
        await query(`INSERT INTO category (id, name, slug) VALUES (?, ?, ?)`, [null, res.name, res.slug])
    } catch (error) {
        return NextResponse.json(UNSUCCESS)
    }
    return NextResponse.json(SUCCESS)
}
export { GET, POST }






    /*const { searchParams } = new URL(request.url)
    if(searchParams.get('page')){
        const page = searchParams.get('page')
        console.log(page)

        let pageNumber = 0
        if (Number(page) > 1) {
            pageNumber = Number(page) - 1
        }else{
            pageNumber = 0
        }
        const itemsPerPage = Number(process.env.ITEMS_PER_PAGE)
        const pagesVisited = pageNumber * itemsPerPage
        const categories = await query('SELECT * FROM category LIMIT ?, ?', [String(pagesVisited), String(itemsPerPage)])
        const totalCategories = await query('SELECT COUNT(id) AS total FROM category', [])
        const results = {
            categories: categories,
            totalCategories: totalCategories
        }
        return NextResponse.json(results)
    }else{
        const data = await query(`SELECT * FROM category`, [])
        return NextResponse.json(data)
    }*/