import { NextRequest, NextResponse } from "next/server"

const GET = async (request: NextRequest) => {
    console.log("asdasdasdasdlkjalksdjkl")
    return NextResponse.json({message: "poa"})
}

const POST = async (request: NextRequest) => {
    //const res = await request.json()
    
    return NextResponse.json({message: "POST"})
}

export {
    GET, POST
}