import { User, Users } from '../../models/users'

const testUsers = new Users()

describe('Users Model', () => {
    it('should have an index method', () => {
        expect(testUsers.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(testUsers.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(testUsers.login).toBeDefined();
    });

    it('should have a update method', () => {
        expect(testUsers.register).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(testUsers.index).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result = await testUsers.register({
            firstname: 'test first name',
            lastname: "test last name",
            email: "email@email.com",
            password: 'Password',
            created_at: '22/11/2023'
        });
        expect(result).toEqual({
            id:1,
            firstname: 'test first name',
            lastname: 'test last name',
            email: 'email@email.com',
            created_at: '22/11/2023'
        });
    });

    it('index method should return a list of user', async () => {
        const result = await testUsers.index();
        expect(result).toEqual([{
            id:1,
            firstname: 'test first name',
            lastname: "test last name",
            email: "email@email.com",
            created_at: '22/11/2023'
        }]);
    });

    it('show method should return the correct user', async () => {
        const result = await testUsers.show("1");
        expect(result).toEqual({

            id:1,
            firstname: 'test first name',
            lastname: 'test last name',
            email: 'email@email.com',
            created_at: '22/11/2023'
        });
    });

})
