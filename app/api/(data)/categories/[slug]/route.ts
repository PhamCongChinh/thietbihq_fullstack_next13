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
    console.log(slug)
    let response
    switch (slug) {
        case "getCategories":
            response = await query(`SELECT id, name, slug FROM category`, [])
            break;
        default:
            response = await query(`SELECT * FROM category WHERE slug = ?`, [slug])
    }
    return NextResponse.json(response)
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