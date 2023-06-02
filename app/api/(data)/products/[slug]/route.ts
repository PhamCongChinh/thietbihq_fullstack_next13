import query from "@/config/dbconfig";
import { SUCCESS, UNSUCCESS } from "@/helpers/constants";
import { NextRequest, NextResponse } from "next/server";


const GET = async (request: NextRequest, {
        params,
    }:{
        params: {slug: string}
    }
) => {
    const slug = params.slug
    let response
    switch (slug) {
        case 'unknown':
            break;
        default:
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
        await query(`DELETE FROM product WHERE slug = ?`,[slug])
    } catch (error) {
        console.log(error)
        return NextResponse.json(UNSUCCESS)
    }
    return NextResponse.json(SUCCESS)
}

export {
    GET, DELETE
}