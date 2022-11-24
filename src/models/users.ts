// @ts-ignore
import Client from '../database'
// @ts-ignore
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import {Product} from "./products";
dotenv.config()
const { SALT_ROUNDS,PEPPER } = process.env

export type User = {
    id?: Number
    firstname: string
    lastname: string
    email: string
    password?: string
    created_at?: string
}

export class Users {

    async login(user: User): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE email=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [user.email])

            conn.release()
            if (bcrypt.compareSync(user.password && user.password + PEPPER, result.rows[0].password)) {
              const userdata =   result.rows[0]
                delete  userdata['password']
                return userdata

            }
            else {
                throw new Error(`email or password are not correct `)
            }

        } catch (err) {
            throw new Error(`Could not find user ${user.email}. Error: ${err}`)
        }
    }
    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT id,firstname,lastname,email,created_at FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get users : ${err}`)
        }
    }
    async register(b: User): Promise<User> {

        try {
            const sql = 'INSERT INTO users (firstname,lastname, email, password,created_at) VALUES($1, $2, $3, $4,$5) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()
            const hash = bcrypt.hashSync(
                b.password &&  b.password+ PEPPER,
                parseInt(SALT_ROUNDS as string)
            );
            const result = await conn.query(sql, [b.firstname,b.lastname,b.email, hash, b.created_at])

            const user = result.rows[0]
            delete user['password']

            conn.release()

            return user
        } catch (err) {
            throw new Error(`Could not add new user ${b.firstname} ${b.lastname}. Error: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()
            const user = result.rows[0]
            delete user['password']

            return user
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

}
