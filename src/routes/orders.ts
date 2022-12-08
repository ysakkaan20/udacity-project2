import express from "express";
import {addProduct, create, current, destroy, index, show} from '../handlers/orders'
import authentication from "../utilities/authentication";

const orders = express.Router()

orders.get('/',authentication, index)
orders.get('/:id',authentication, show)
orders.post('/', authentication, create)
orders.post('/addproduct', authentication,addProduct)
orders.delete('/',authentication, destroy)
orders.post('/current', authentication, current)

export default orders