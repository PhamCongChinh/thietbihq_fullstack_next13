
import query from "@/config/dbconfig"
import { toBuffer } from "@/libs/toBuffer"
import { NextRequest, NextResponse } from "next/server"
import fs from 'fs'
import { SUCCESS, UNSUCCESS } from "@/helpers/constants"

const GET = async (request: NextRequest) => {
    let data = []
    try {
        data = await query(`SELECT p.*, c.slug AS slug_category FROM product p, category c WHERE p.id_category = c.id`, [])
    } catch (error) {
        console.log(error)
        return NextResponse.json(UNSUCCESS)
    }
    return NextResponse.json(data)
}

const POST = async (request: NextRequest) => {
    let formData = await request.formData()
    const date = new Date()
    let id_category = String(formData.get('id_category'))
    let name = String(formData.get('name'))
    let slug = String(formData.get('slug'))

    const file = formData.get("image") as File
    let fileName = file.name

    let image_list = String(formData.get('image_list'))
    let price = String(formData.get('price'))
    let content = String(formData.get('content'))
    let discount = String(formData.get('discount'))
    let view = String(formData.get('view'))
    let createdAt = date.toLocaleString()
    let updateAt = date.toLocaleString()
    
    try {
        await query(`INSERT INTO product (id_category, name, slug, image, image_list, price, content, discount, view, createdAt, updateAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)`, 
        [ id_category, name, slug, fileName, image_list, price, content, discount, view, createdAt, updateAt])
        const arrayBuffer = await file.arrayBuffer()
        const buffer = toBuffer(arrayBuffer)
        fs.writeFileSync(`./public/images/products/${file.name}`, buffer)
    } catch (error) {
        return NextResponse.json(UNSUCCESS)
    }
    return NextResponse.json(SUCCESS)
}

export {
    GET, POST
}