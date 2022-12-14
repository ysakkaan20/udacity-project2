import {Request, Response} from 'express'
import {Order, Orders} from '../models/orders'

const store = new Orders()

export const index = async (_req: Request, res: Response) => {
    try{
        const orders = await store.index()

        res.send(orders)
    }catch (err){
        res.status(400)
        res.json(err)
    }

}

export const show = async (req: Request, res: Response) => {

    try{
        const order = await store.show(req.params.id)
        res.json(order)
    }catch (err){
        res.status(400)
        res.json(err)
    }

}

export const current = async (req: Request, res: Response) => {
    // @ts-ignore
   try{
       const order = await store.showByUser(res.locals.user_id)

       res.json(order)
   }catch (err){
       res.status(400)
       res.json(err)
   }

}

export const create = async (req: Request, res: Response) => {

    try {
        const order: Order = {
            user_id: res.locals.user_id,
            status: false,
        }

        const newOrders = await store.create(order)

        res.json(newOrders)
    } catch (err) {
        console.log(err)
        res.status(400)
        res.json(err)
    }
}

export const destroy = async (req: Request, res: Response) => {

    try{
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    }catch (err){
        res.status(400)
        res.json(err)
    }

}
export const addProduct = async (req: Request, res: Response) => {

    try{

        const deleted = await store.addProduct(req.body.quantaty, req.body.order_id, req.body.porduct_id)
        res.json(deleted)
    }catch (err){
        res.status(400)
        res.json(err)
    }

}




