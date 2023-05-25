import query from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest, {
    params,
}:{
    params: {slug: string}
}
) => {
    const slug = params.slug
    const response = await query(`SELECT * FROM product WHERE id_category IN (SELECT id FROM category WHERE slug = ?)`, [slug])
    return NextResponse.json(response)
}

export { GET }