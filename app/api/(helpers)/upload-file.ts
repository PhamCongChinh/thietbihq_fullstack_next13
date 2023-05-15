import formidable from "formidable"
import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'
import path from "path"



const POST = async (request: NextRequest) => {
    let res = await request.formData()
    
    let body = Object.fromEntries(res)
    console.log(body)
    const uploadFolder = path.join('./', 'public', 'images')
    //console.log(up)
    const form = formidable({
        multiples: true,
        maxFieldsSize: 50 * 1024 * 1024,
        uploadDir: uploadFolder
    })
    /*form.parse(request, async (err: any, fields: any, files: any) => {
        return res.status(201).send(files.image.newFilename)
    })*/
    return NextResponse.json({message: "POST"})
}

export {
    POST
}