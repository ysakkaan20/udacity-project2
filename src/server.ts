import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
// @ts-ignore
import Client from './database'

const app: express.Application = express()
const address: string = '0.0.0.0:3000'

app.use(bodyParser.json())

app.get('/', async function (req: Request, res: Response) {
    try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM users'
        const result = await conn.query(sql)
        conn.release()
        return result.rows
    } catch (err) {
        throw new Error(`Cannot get users : ${err}`)
    }
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
