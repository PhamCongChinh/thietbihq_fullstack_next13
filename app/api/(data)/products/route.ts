import { NextRequest, NextResponse } from "next/server"

const GET = async (request: NextRequest) => {

}

const POST = async (request: NextRequest) => {
    //const res = await request.json()
    console.log(request)
    
    return NextResponse.json(request)
}

export {
    GET, POST
}