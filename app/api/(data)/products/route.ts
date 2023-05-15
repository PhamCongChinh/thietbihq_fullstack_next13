import formidable, { IncomingForm } from "formidable"
import { promises as fs } from 'fs'
import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

/*export const config = {
    api: {
      bodyParser: false // Disallow body parsing, consume as stream
    }
}*/

const GET = async (request: NextRequest) => {
    console.log("asdasdasdasdlkjalksdjkl")
    return NextResponse.json({message: "post"})
}


type ProcessedFiles = Array<[string, File]>

const POST = async (request: NextRequest) => {
    let formData = await request.formData()
    //let res = Object.fromEntries(data)
    const file = formData.get('file')
    let abc: any = file
    console.log(abc.originalFilenames)
    const url = URL.createObjectURL(abc)
    console.log(typeof(url))


    

    return NextResponse.json({message: "POST"})
}

export {
    GET, POST
}