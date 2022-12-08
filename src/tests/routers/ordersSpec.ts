import express from 'express'
import supertest from 'supertest'
import bodyParser from "body-parser";
import routes from '../../routes/index'

const app: express.Application = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(bodyParser.raw({type: 'multipart/form-data; boundary=<calculated when request is sent>'}))
app.use('/', routes)

let TOKEN = ""

describe('test the endpoint to check orders', function () {
    beforeAll(async function() {



        const login = {
            email: "userfortoken@email.com",
            password: 'Password',
        }



        const userLogin = await supertest(app)

            .post('/users/login')
            .set('Accept', 'application/json')
            .type('form')
            .send(login)

        TOKEN=userLogin.body

    });
    it('it should return 200 and the order after add it into database ', async function () {


        const response = await supertest(app)
            .post('/orders')

            .auth(TOKEN, {type: 'bearer'})

        expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({id: 2, status: false, user_id: '1'});


    })

    it('it should return 200 and all orders  ', async function () {


        const response = await supertest(app)
            .get('/orders')
            .auth(TOKEN, {type: 'bearer'})
        expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
            {id: 1, status: true, user_id: '1', products: []},
            {id: 2, status: false, user_id: '1', products: []}
        ]);


    })
    it('it should return 200 and all order  ', async function () {


        const response = await supertest(app)
            .get('/orders/1')
            .auth(TOKEN, {type: 'bearer'})
        expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({id: 1, status: true, user_id: '1', products: []});


    })
})
