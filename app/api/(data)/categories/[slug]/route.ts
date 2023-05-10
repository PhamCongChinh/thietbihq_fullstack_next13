import query from "@/config/dbconfig"
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
        if (slug === 'category-total') {
            res = await query(`SELECT COUNT(id) AS total FROM category`, [])
        } else {
            res = await query(`SELECT * FROM category WHERE id = ?`, [slug])        
        }
        
    } catch (error) {
        console.log(error)
    }
    console.log(res)
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
    }
    return NextResponse.json({message: 'Thanh cong'})
}

export { GET, PUT, DELETE }