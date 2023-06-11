import query from "@/config/dbconfig"
import { NextRequest, NextResponse } from "next/server"

const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    console.log("page", page)
    console.log("Number(page)", Number(page))
    let products = []
    if (Number(page) >= 0) {
        const itemsPerPage = 3
        const pagesVisited = itemsPerPage * Number(page)
        try {
            products = await query(`SELECT p.*, c.slug as c_slug, c.name as c_name FROM product p, category c LIMIT ?, ?`, [String(pagesVisited), String(itemsPerPage)])
        } catch (error) {
            console.log(error)
        }
    }
    return NextResponse.json(products)
}

export {
    GET
}