import { IncomingForm } from "formidable"
import { NextApiRequest } from "next"
import { NextResponse } from "next/server"

export async function POST(request: NextApiRequest) {
    //let res = await request.formData()
    //let data = res.get("image")
    //console.log(res)
    //console.log(data)



    return NextResponse.json({ message: "POST" })
}
