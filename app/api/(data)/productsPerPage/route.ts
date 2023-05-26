import query from "@/config/dbconfig"
import { NextRequest, NextResponse } from "next/server"

const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    console.log(page)
    let pageCheck = 0
    if (page == null || page == "") {
        console.log("Rong")
        //page = 0
    }
    const itemsPerPage = 1
    const pagesVisited = itemsPerPage * Number(page)
    let products = []
    try {
        products = await query(`SELECT * FROM product LIMIT ?, ?`, [String(pagesVisited), String(itemsPerPage)])
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json(products)
}

export {
    GET
}