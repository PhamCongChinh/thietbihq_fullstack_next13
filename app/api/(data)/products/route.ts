import formidable, { IncomingForm } from "formidable"
import { promises as fs } from 'fs'
import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"
import path from "path"


const GET = async (request: NextRequest) => {
    console.log("asdasdasdasdlkjalksdjkl")
    return NextResponse.json({message: "post"})
}

const POST = async (request: NextRequest) => {
    let formData = await request.formData()
    console.log(formData)
    return NextResponse.json({message: "POST"})
}

export {
    GET, POST
}