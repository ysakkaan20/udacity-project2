import express from 'express'
import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";

const dotEnvPath = path.join(__dirname, '../', '../', '.env');
// @ts-ignore
const env = dotenv.config({path: dotEnvPath});
// @ts-ignore
const TOKEN_SECRET: string = env.parsed.TOKEN_SECRET

const authentication = (
    req: express.Request,
    res: express.Response,
    next: Function
): void => {
    try {

        const authorizationHeader = req.headers.authorization
        // @ts-ignore
        const token = authorizationHeader.split(' ')[1]

        const decoded = jwt.verify(token, TOKEN_SECRET)


        // @ts-ignore
        res.locals.user_id = decoded.user.id

        next()
    } catch (err) {
        console.log(err)
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

}

export default authentication