import query from "@/config/dbconfig";
import { verify } from "@/utils/auth/jwtSignVerify";
import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
    console.log("Get Profile")
    const token = request.headers.get('Authorization')
    console.log("Authorization:", token)
    const response = await query(`SELECT * FROM product WHERE id = ?`, ["47"])
    return NextResponse.json(response)
}

export { GET }