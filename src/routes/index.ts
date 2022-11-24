import express from 'express'
import orders from './orders'
import products  from './products'
import user  from './users'
const routes = express.Router()
routes.use('/orders', orders)
routes.use('/products', products)
routes.use('/users', user)

export default routes
