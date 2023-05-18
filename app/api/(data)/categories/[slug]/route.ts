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
    
    try {
        if (slug === 'getCategories') {
            res = await query(`SELECT id, name FROM category`, [])
        } else {
            res = await query(`SELECT * FROM category WHERE id = ?`, [slug])        
        }
        
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json(res)
}

const PUT = async (request: NextRequest) => {
    const res = await request.json()
    console.log(res)
    try {
        await query(`UPDATE category SET name = ?, slug = ? WHERE id = ?`, [res.name, res.slug, res.id])
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({message: 'Thanh cong'})
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
        return NextResponse.json({message: UNSUCCESS})
    }
    return NextResponse.json({message: SUCCESS})
}

export { GET, PUT, DELETE }