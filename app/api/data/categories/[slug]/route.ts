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
    let data = []
    try {
        data = await query(`SELECT * FROM category WHERE slug = ?`, [slug])
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json(data)
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
    try {
        await query(`DELETE FROM category WHERE id = ?`, [slug])
    } catch (error) {
        console.log(error)
        return NextResponse.json(UNSUCCESS)
    }
    return NextResponse.json(SUCCESS)
}

export { GET, PUT, DELETE }





////let response
    /*switch (slug) {
        case "getCategories":
            response = await query(`SELECT id, name, slug FROM category`, [])
            break;
        default:
            response = await query(`SELECT * FROM category WHERE slug = ? OR id = ?`, [slug, slug])
    }*/