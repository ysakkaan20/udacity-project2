// @ts-ignore
import Client from '../database'
import {Product, Products} from "./products";
// @ts-ignore


export type OrderProduct = {
    product: Product
    quantity: Number


}

export type Order = {
    id?: Number
    user_id: Number | string
    status: boolean
    products?: Product[]

}

export class Orders {
    async index(): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            const allOrders = result.rows
            conn.release()
            for (const row of allOrders) {
                row.products = await this.getOrderProducts(row.id)
            }
            return allOrders
        } catch (err) {
            throw new Error(`Cannot get orders : ${err}`)
        }
    }

    async show(id: string): Promise<Order> {

        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            const order = result.rows[0]
            conn.release()
            order.products = []
          order.products = await this.getOrderProducts(result.rows[0].id)

            return order
        } catch (err) {
            throw new Error(`Could not find orders ${id}. Error: ${err}`)
        }
    }

    async showByUser(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND  status=($2)'
            // @ts-ignore
            const conn = await Client.connect()
            console.log("result")
            const result = await conn.query(sql, [id, false])

            conn.release()

            return result.rows[0]
        } catch (err) {
            console.log(err)
            throw new Error(`Could not find orders ${id}. Error: ${err}`)
        }
    }

    async create(o: Order): Promise<Order> {

        try {
            await this.closeAllOrder(o.user_id.toString())
            const sql = 'INSERT INTO orders ( user_id, status) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [o.user_id, false])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add your order. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not delete your order ${id}. Error: ${err}`)
        }
    }

    async closeOrder(id: string): Promise<Order> {
        try {
            const sql = 'UPDATE orders  SET status=($2) WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id, true])

            const user = result.rows[0]

            conn.release()

            return user
        } catch (err) {
            throw new Error(`Could not close your order ${id}. Error: ${err}`)
        }
    }

    async closeAllOrder(id: string): Promise<Order> {
        try {
            const sql = 'UPDATE orders  SET status=($2) WHERE user_id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id, true])

            const user = result.rows[0]

            conn.release()

            return user
        } catch (err) {
            throw new Error(`Could not close your order ${id}. Error: ${err}`)
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const orderData = this.show(orderId)
            //@ts-ignore
            if (!orderData.status) {
                const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
                //@ts-ignore
                const conn = await Client.connect()

                const result = await conn
                    .query(sql, [quantity, orderId, productId])

                const order = result.rows[0]

                conn.release()

                return order
            } else {
                throw new Error(`Could not add product to this order ,this order is completed`)
            }
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }

    async getOrderProducts(id: string): Promise<OrderProduct[]> {
        try {

            //@ts-ignore

            const sql = 'SELECT * FROM order_products WHERE order_id=($1) '
            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn
                .query(sql, [id])

            const order_products = result.rows
            const order_products_data: OrderProduct[] = []

            const ProductsModle = new Products()
            for (const row of order_products) {

                const productData = await ProductsModle.show(row.product_id)

                const product = {
                    product: productData,
                    quantity: row.quantity
                }
                order_products_data.push(product)
            }
            conn.release()

            return order_products_data

        } catch (err) {
            throw new Error(`Could not add product  to order : ${err}`)
        }
    }
}
