import express, { Request, Response } from 'express'
import { User, Users } from '../models/users'
import jwt from 'jsonwebtoken'
const store = new Users()

export const login = async (req: Request, res: Response) => {
   try{

    const userPosted = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    }
    const user = await store.login(userPosted)

        const  token = jwt.sign( {user:{
                id:user.id,
                firstname: user.firstname,
                lastname:user.lastname,
                email:user.email
            }} , process.env.TOKEN_SECRET);
        res.json(token)
    }catch {
        res.status(401)
        res.json('Invalid email or password')
    }

}
export const index = async (_req: Request, res: Response) => {
    const users = await store.index()

    res.send(users)
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
    } catch(err) {
        console.log(err)
        res.status(400)
        res.json(err)
    }
}
export const show = async (req: Request, res: Response) => {

    const user = await store.show(req.params.id)
    res.json(user)
}

