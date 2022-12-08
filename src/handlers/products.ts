import {Request, Response} from 'express'
import {Product, Products} from '../models/products'

const store = new Products()

export const index = async (_req: Request, res: Response) => {

    try{
        const orders = await store.index()

        res.send(orders)

    }catch (err) {
        res.status(400)
        res.json(err)
    }
    }


export const show = async (req: Request, res: Response) => {

    try{
        const product = await store.show(req.params.id)
        res.json(product)
    }catch (err) {
        res.status(400)
        res.json(err)
    }

}

export const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
        }

        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch (err) {
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




