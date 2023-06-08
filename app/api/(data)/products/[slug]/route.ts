import query from "@/config/dbconfig";
import { SUCCESS, UNSUCCESS } from "@/helpers/constants";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs'

const GET = async (request: NextRequest, {
        params,
    }:{
        params: {slug: string}
    }
) => {
    const slug = params.slug

    let response
    const id = Number(slug)
    if (id > 0) {
        response = await query(`SELECT * FROM product WHERE id = ?`, [String(id)])
    }else{
        response = await query(`SELECT * FROM product WHERE slug = ?`, [slug])
    }

    return NextResponse.json(response)
}

const DELETE = async (request: NextRequest, {
        params,
    }:{
        params: {slug: string}
    }
) => {
    const slug = params.slug
    try {
        const [data] = await query(`SELECT image from product WHERE slug = ?`, [slug])
        await query(`DELETE FROM product WHERE slug = ?`,[slug])
        console.log(data.image)
        fs.rmSync(`./public/images/products/${data.image}`)
    } catch (error) {
        console.log(error)
        return NextResponse.json(UNSUCCESS)
    }
    return NextResponse.json(SUCCESS)
}

export {
    GET, DELETE
}