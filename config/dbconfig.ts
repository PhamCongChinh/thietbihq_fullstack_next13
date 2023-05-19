import mysql from 'mysql2/promise'

const query = async (query: string, value: string[]) => {
    const dbconnection = await mysql.createConnection({
        host: process.env.DB_MYSQL_HOST,
        database: process.env.DB_MYSQL_NAME,
        user: process.env.DB_MYSQL_USER,
        password: process.env.DB_MYSQL_PASS
    })
    try {
        const [results] = await dbconnection.execute(query, value)
        dbconnection.end()
        return JSON.parse(JSON.stringify(results))
    } catch (error: any){
        throw Error(error.message)
        return {error}
    }
}

export default query