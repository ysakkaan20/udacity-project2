import express from 'express'
import supertest from 'supertest'
import bodyParser from "body-parser";
import routes from '../../routes/index'

const app: express.Application = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())


app.use(bodyParser.raw({type: 'multipart/form-data; boundary=<calculated when request is sent>'}))


app.use('/', routes)

let TOKEN = ''

describe('test the endpoint to check products', function () {
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
    it('it should return 200 and the product after add it into database ', async function () {


        const query = {
            name: "new product from endpoint",
            price: 100
        };
        const response = await supertest(app)
            .post('/products')
            .auth(TOKEN, {type: 'bearer'})
            .send(query)

        expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(2);

        expect(response.body.name).toEqual(query.name);
        expect(response.body.price).toEqual(query.price.toString());


    })
    it('it should return 200 and all products  ', async function () {


        const response = await supertest(app)
            .get('/products')

        expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            [
                {id: 1, name: 'new product', price: '50'},
                {id: 2, name: 'new product from endpoint', price: '100'}
            ]
        )

    })
    it('it should return 200 and one product  ', async function () {


        const response = await supertest(app)
            .get('/products/2')

        expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            {id: 2, name: 'new product from endpoint', price: '100'}
        )

    })
})
