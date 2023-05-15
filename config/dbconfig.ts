import mysql from 'mysql2/promise'

const query = async (query: string, value: string[]) => {
    const dbconnection = await mysql.createConnection({
        host: 'localhost',
        database: 'thietbihq',
        user: 'root',
        password: '10020521'
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