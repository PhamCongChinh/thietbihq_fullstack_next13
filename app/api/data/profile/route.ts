import query from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
    console.log("Get Profile")
    const token = request.headers.get('Authorization')
    console.log("first", token)
    //const response = await query(`SELECT p.*, c.slug AS slug_category FROM product p, category c WHERE c.id = p.id_category AND id_category IN (SELECT id FROM category WHERE slug = ?)`, [slug])
    return NextResponse.json(null)
}

export { GET }