import query from "@/config/dbconfig"
import { NextRequest, NextResponse } from "next/server"

const POST = async (request: NextRequest) => {
    const res = await request.json()
    const [ user ] = await query(`SELECT COUNT(*) AS COUNT FROM user WHERE username = ?`, [res.username])
    console.log('Count user in database:', user.COUNT)
    if (user.COUNT === 0) {
        console.log("Chua ton tai")
        const result = await query(
            `INSERT INTO user (id, username, password, refreshToken) VALUES (?,?,?,?)`,
            [null, res.username, res.password, null])
        console.log(result)
    }else{
        console.log("Da ton tai")
        //alert('Da ton tai')
    }
    return NextResponse.json({res})
}

export {
    POST
}