import express from "express";
import {addProduct, create, current, destroy, index, show} from '../handlers/orders'
import authentication from "../utilities/authentication";

const orders = express.Router()

orders.get('/', index)
orders.get('/:id', show)
orders.post('/', authentication, create)
orders.post('/addproduct', addProduct)
orders.delete('/', destroy)
orders.post('/current', authentication, current)

export default orders