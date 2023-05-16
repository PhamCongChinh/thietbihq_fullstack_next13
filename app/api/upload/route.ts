import formidable, { IncomingForm } from "formidable"
import { NextRequest, NextResponse } from "next/server"
import fs from 'fs'
import { NextApiRequest } from "next"


export async function POST(request: NextRequest) {
    let res = await request.formData()
    console.log("res", res)

    let data = res.get("image")
    let body = Object.fromEntries(res)

    console.log("data", data)
    console.log("body", body)

    console.log(typeof(res))
    console.log(typeof(data))
    console.log(typeof(body))

    return NextResponse.json({ message: "POST" })
}