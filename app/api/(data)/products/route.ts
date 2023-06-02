
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
    let updatedAt = date.toLocaleString()
    
    try {
        await query(`INSERT INTO product (id_category, name, slug, image, image_list, price, content, discount, view, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)`, 
        [ id_category, name, slug, fileName, image_list, price, content, discount, view, createdAt, updatedAt])
        const arrayBuffer = await file.arrayBuffer()
        const buffer = toBuffer(arrayBuffer)
        fs.writeFileSync(`./public/images/products/${file.name}`, buffer)
    } catch (error) {
        return NextResponse.json(UNSUCCESS)
    }
    return NextResponse.json(SUCCESS)
}

const PUT = async (request: NextRequest) => {
    let formData = await request.formData()
    const date = new Date()
    console.log(formData)
    let id = String(formData.get('id'))
    let id_category = String(formData.get('id_category'))
    let name = String(formData.get('name'))
    let slug = String(formData.get('slug'))

    let image_name
    let image_old
    const file = formData.get("image") as File
    if (file) {
        image_name = file.name
        image_old = String(formData.get('image_name'))
    }else{
        image_name = String(formData.get('image_name'))
    }
    
    console.log(image_name)
    console.log(image_old)
    let image_list = String(formData.get('image_list'))
    let price = String(formData.get('price'))
    let content = String(formData.get('content'))
    let discount = String(formData.get('discount'))
    let view = String(formData.get('view'))
    let updatedAt = date.toLocaleString()
    console.log("id_category", id_category)
    try {
        // Them db
        await query(`UPDATE product SET id_category = ?, name = ?, slug = ?, image = ?, image_list = ?, price = ?, content = ?, discount = ?, view = ?, updatedAt = ? WHERE id = ?`,
        [id_category, name, slug, image_name, image_list, price, content, discount, view, updatedAt, id])
        // Them anh moi
        const arrayBuffer = await file.arrayBuffer()
        const buffer = toBuffer(arrayBuffer)
        fs.writeFileSync(`./public/images/products/${file.name}`, buffer)
        // Xoa anh cu
        fs.rmSync(`./public/images/products/${image_old}`)
    } catch (error) {
        console.log(error)
        return NextResponse.json(UNSUCCESS)
    }
    return NextResponse.json(SUCCESS)
}

export {
    GET, POST, PUT
}