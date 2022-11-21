import { User, Users } from '../../models/users'

const testUsers = new Users()

describe('Users Model', () => {
    it('Should have an index method', () => {
        expect(testUsers.index).toBeDefined()
    })

    it('index method should return a list of users', async () => {
        const result = await testUsers.index()
        expect(result).toEqual([])
    })
})
