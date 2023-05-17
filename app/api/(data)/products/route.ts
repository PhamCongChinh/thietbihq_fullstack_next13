
import { toBuffer } from "@/libs/toBuffer"
import { NextRequest, NextResponse } from "next/server"

const GET = async (request: NextRequest) => {
    console.log("asdasdasdasdlkjalksdjkl")
    return NextResponse.json({message: "post"})
}

const POST = async (request: NextRequest) => {
    let formData = await request.formData()
    console.log(formData)
    const file = formData.get("image") as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = toBuffer(arrayBuffer)
    console.log(buffer)

    
    return NextResponse.json({message: "POST"})
}

export {
    GET, POST
}