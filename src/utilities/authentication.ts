import express from 'express'
import jwt from "jsonwebtoken";
const authentication = (
    req: express.Request,
    res: express.Response,
    next: Function
): void => {

    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]

      const  decoded= jwt.verify(token, process.env.TOKEN_SECRET)


        // @ts-ignore
        res.locals.user_id = decoded.user.id

        next()
    } catch(err) {
        console.log(err)
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

}

export default authentication