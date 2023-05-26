
import query from "@/config/dbconfig"
import { toBuffer } from "@/libs/toBuffer"
import { NextRequest, NextResponse } from "next/server"
import fs from 'fs'
import { SUCCESS, UNSUCCESS } from "@/helpers/constants"

const GET = async (request: NextRequest) => {
    const data = await query(`SELECT p.*, c.slug AS slug_category FROM product p, category c WHERE p.id_category = c.id`, [])
    console.log(data)
    return NextResponse.json(data)
}

const POST = async (request: NextRequest) => {
    let formData = await request.formData()
    let id_category = Number(formData.get('categoryId'))
    let name = String(formData.get('name'))
    let slug = String(formData.get('slug'))
    const file = formData.get("image") as File
    let fileName = file.name
    try {
        await query(`INSERT INTO product (id_category, name, slug, image) VALUES (?,?,?,?)`, [ String(id_category), name, slug, fileName])
        const arrayBuffer = await file.arrayBuffer()
        const buffer = toBuffer(arrayBuffer)
        fs.writeFileSync(`./public/images/products/${file.name}`, buffer)
    } catch (error) {
        NextResponse.json(UNSUCCESS)
    }
    return NextResponse.json(SUCCESS)
}

export {
    GET, POST
}