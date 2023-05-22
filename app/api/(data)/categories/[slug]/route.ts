import query from "@/config/dbconfig"
import { SUCCESS, UNSUCCESS } from "@/helpers/constants"
import { NextRequest, NextResponse } from "next/server"

const GET = async (request: NextRequest, {
        params,
    }:{
        params: {slug: string}
    }
) => {
    const slug = params.slug
    let res

    switch (slug) {
        case "getCategories":
            res = await query(`SELECT id, name FROM category`, [])
            break;
        default:
            res = await query(`SELECT * FROM category WHERE id = ?`, [slug])
    }
    return NextResponse.json(res)
}

const PUT = async (request: NextRequest) => {
    const res = await request.json()
    try {
        await query(`UPDATE category SET name = ?, slug = ? WHERE id = ?`, [res.name, res.slug, res.id])
    } catch (error) {
        console.log(error)
        return NextResponse.json(UNSUCCESS)
    }
    return NextResponse.json(SUCCESS)
}

const DELETE = async (request: NextRequest, {
        params,
    }:{
        params: {slug: string}
}) => {
    const slug = params.slug
    console.log("Delete:", slug)
    try {
        await query(`DELETE FROM category WHERE id = ?`, [slug])
    } catch (error) {
        console.log(error)
        return NextResponse.json(UNSUCCESS)
    }
    return NextResponse.json(SUCCESS)
}

export { GET, PUT, DELETE }