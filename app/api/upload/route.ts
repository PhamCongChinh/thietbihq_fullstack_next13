import { NextRequest, NextResponse } from "next/server"
import fs from 'fs'

function toBuffer(arrayBuffer: ArrayBuffer) {
    const buffer = Buffer.alloc(arrayBuffer.byteLength);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}

export async function POST(request: NextRequest) {
    const formData = await request.formData()
    const file = formData.get("image") as File
    //let body = Object.fromEntries(formData)
    
    const arrayBuffer = await file.arrayBuffer()
    const buffer = toBuffer(arrayBuffer)
    fs.writeFileSync(`./public/uploads/${file.name}`, buffer);
    return NextResponse.json({ message: "POST" })
}
