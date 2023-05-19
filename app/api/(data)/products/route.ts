
import query from "@/config/dbconfig"
import { toBuffer } from "@/libs/toBuffer"
import { NextRequest, NextResponse } from "next/server"

const GET = async (request: NextRequest) => {
    const [ data ] = await query(`CALL PR_GET_PRODUCTS()`, [])
    console.log(data)
    return NextResponse.json(data)
}

const POST = async (request: NextRequest) => {
    let formData = await request.formData()
    let id_category = Number(formData.get('categoryId'))
    console.log(formData.get('categoryId'))
    console.log(id_category)

    await query(`INSERT INTO product (id_category, name, slug, image) VALUES (?,?,?,?)`, [ String(id_category), "null", "null", "null"])



    const file = formData.get("image") as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = toBuffer(arrayBuffer)
    //console.log(buffer)

    
    return NextResponse.json({message: "POST"})
}

export {
    GET, POST
}