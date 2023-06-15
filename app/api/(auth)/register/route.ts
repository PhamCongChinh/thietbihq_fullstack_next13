import query from "@/config/dbconfig"
import { SUCCESS, UNSUCCESS, cryptoSecret } from "@/helpers/constants"
import { encrypt } from "@/helpers/crypto"
import { NextRequest, NextResponse } from "next/server"

const POST = async (request: NextRequest) => {

    const ipClient = request.headers.get('x-forwarded-for')?.split(',')[0]
    console.log("ipClient: ", ipClient)

    const res = await request.json()
    console.log("Register Form:", res)
    const ciphertext = encrypt(res.password, cryptoSecret!)
    console.log(ciphertext)
    const [ user ] = await query(`SELECT COUNT(*) AS COUNT FROM user WHERE username = ?`, [res.username])
    console.log('Count user in database:', user.COUNT)
    if (user.COUNT === 0) {
        console.log("User is created")
        const result = await query(
            `INSERT INTO user (id, username, password, refreshToken) VALUES (?,?,?,?)`,
            [null, res.username, ciphertext, null])
        console.log(result)
        return NextResponse.json(SUCCESS)
    }else{
        return NextResponse.json(UNSUCCESS)
    }
}

export {
    POST
}