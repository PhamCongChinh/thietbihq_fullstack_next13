import query from "@/config/dbconfig"
import { SUCCESS, UNSUCCESS, cryptoSecret } from "@/helpers/constants"
import { encrypt } from "@/helpers/crypto"
import { NextRequest, NextResponse } from "next/server"

const POST = async (request: NextRequest) => {

    //const ipClient = request.headers.get('x-forwarded-for')?.split(',')[0]
    //console.log("ipClient: ", ipClient)

    const res = await request.json()
    const ciphertext = encrypt(res.password, cryptoSecret!)
    const [ user ] = await query(`SELECT COUNT(*) AS COUNT FROM user WHERE username = ?`, [res.username])
    console.log('Count user in database:', user.COUNT)
    if (user.COUNT === 0) {
        console.log("Chua ton tai")
        const result = await query(
            `INSERT INTO user (id, username, password, refreshToken) VALUES (?,?,?,?)`,
            [null, res.username, ciphertext, null])
        console.log(result)
        return NextResponse.json({message: SUCCESS})
    }else{
        return NextResponse.json({message: UNSUCCESS})
    }
}

export {
    POST
}