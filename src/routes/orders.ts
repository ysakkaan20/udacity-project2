import express from "express";
import {index, show, create, destroy, addProduct, current} from '../handlers/orders'
import authentication from "../utilities/authentication";
const orders = express.Router()

orders.get('/', index)
orders.get('/:id', show)
orders.post('/',authentication, create)
orders.post('/addproduct', addProduct)
orders.delete('/', destroy)

orders.post('/csurrent', authentication,current)

export default orders