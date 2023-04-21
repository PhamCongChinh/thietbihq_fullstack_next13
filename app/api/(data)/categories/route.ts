import { NextRequest, NextResponse } from "next/server"

const GET = async (request: NextRequest) => {
    //const res = await request.json()
    console.log("cong chinh")
    return NextResponse.json({message: "laksd"})
}

export { GET }