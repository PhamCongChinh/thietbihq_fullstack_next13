import query from "@/config/dbconfig"
import { NextRequest, NextResponse } from "next/server"

const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    console.log(Number(page))
    let products = []
    if (Number(page) >= 0) {
        const itemsPerPage = 1
        const pagesVisited = itemsPerPage * Number(page)
        try {
            products = await query(`SELECT * FROM product LIMIT ?, ?`, [String(pagesVisited), String(itemsPerPage)])
        } catch (error) {
            console.log(error)
        }
    }
    return NextResponse.json(products)
}

export {
    GET
}