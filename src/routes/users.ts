import express from "express";
import {create, index, login, show} from '../handlers/users'
import authentication from "../utilities/authentication";

const users = express.Router()


users.post('/login', login)
users.post('/register', create)
users.post('/', authentication, create)
users.get('/:id', authentication, show)
users.get('/', authentication, index)


export default users