import { Order, Orders } from '../../models/orders'

const testOrder = new Orders()

describe('Users Model', () => {
    it('should have an index method', () => {
        expect(testOrder.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(testOrder.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(testOrder.showByUser).toBeDefined();
    });

    it('should have a create method', () => {
        expect(testOrder.create).toBeDefined();
    });

    it('should have a update method', () => {
        expect(testOrder.delete).toBeDefined();
    });

    it('should have a update method', () => {
        expect(testOrder.addProduct).toBeDefined();
    });
    it('should have a update method', () => {
        expect(testOrder.getOrderProducts).toBeDefined();
    });


    it('create method should add a user', async () => {
        const result = await testOrder.create({
            user_id: 1,
            status: false
        });
        expect(result).toEqual({
            id:1,
            status: false,
            user_id: "1",

        });
    });

    it('index method should return a list of user', async () => {
        const result = await testOrder.index();
        expect(result).toEqual([{
            id:1,
            user_id: "1",
            status: false,
            products: [  ]
        }]);
    });

    it('show method should return the correct user', async () => {
        const result = await testOrder.show("1");
        expect(result).toEqual({

            id:1,
            user_id: "1",
            status: false,
            products: [  ]
        });
    });

})
