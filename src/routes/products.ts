import express from "express";
import {index , show,create,destroy} from '../handlers/products'
import authentication from "../utilities/authentication";
const products = express.Router()

products.get('/', index)
products.get('/:id', show)
products.post('/',authentication, create)



export default products