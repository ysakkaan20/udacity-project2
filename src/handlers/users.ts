import {Request, Response} from 'express'
import {User, Users} from '../models/users'
import jwt from 'jsonwebtoken'
// @ts-ignore
import dotenv from "dotenv";
import path from "path";

const store = new Users()

const dotEnvPath = path.join(__dirname, '../', '../', '.env');
// @ts-ignore
const env = dotenv.config({path: dotEnvPath});

// @ts-ignore
const TOKEN_SECRET: string = env.parsed.TOKEN_SECRET
export const login = async (req: Request, res: Response) => {

    try {
        const userPosted = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
        }
        const user = await store.login(userPosted)

        const token = jwt.sign({
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        }, TOKEN_SECRET);
        res.json(token)
    } catch {
        res.status(401)
        res.json('Invalid email or password')
    }

}
export const index = async (_req: Request, res: Response) => {
    try{
        const users = await store.index()

        res.send(users)
    }catch (err){
        res.status(400)
        res.json(err)
    }

}

export const create = async (req: Request, res: Response) => {

    try {
        const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
        }

        const newUser = await store.register(user)
        res.json(newUser)
    } catch (err) {

        res.status(400)
        res.json(err)
    }
}
export const show = async (req: Request, res: Response) => {
    try{
        const user = await store.show(req.params.id)
        res.json(user)
    }catch (err){
        res.status(400)
        res.json(err)
    }


}

