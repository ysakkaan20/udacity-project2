import {Products} from '../../models/products'
// @ts-ignore
import dotenv from 'dotenv'

dotenv.config()
const testProducts = new Products()

describe('Users Model', () => {
    it('should have an index method', () => {
        expect(testProducts.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(testProducts.show).toBeDefined();
    });


    it('should have a create method', () => {
        expect(testProducts.create).toBeDefined();
    });

    it('should have a update method', () => {
        expect(testProducts.delete).toBeDefined();
    });


    it('create method should add a user', async () => {
        const result = await testProducts.create({
            name: "new product",
            price: "50",

        });
        expect(result).toEqual({
            id: 1,
            name: "new product",
            price: "50",

        });
    });

    it('index method should return a list of user', async () => {
        const result = await testProducts.index();
        expect(result).toEqual([{
            id: 1,
            name: "new product",
            price: "50",

        }]);
    });

    it('show method should return the correct user', async () => {
        const result = await testProducts.show("1");
        expect(result).toEqual({
            id: 1,
            name: "new product",
            price: "50",

        });
    });

})
