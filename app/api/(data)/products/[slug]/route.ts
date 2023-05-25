import query from "@/config/dbconfig";
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

export {
    GET
}