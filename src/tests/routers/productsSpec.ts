import express from 'express'
import supertest from 'supertest'
import bodyParser from "body-parser";
import routes from '../../routes/index'

const app: express.Application = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())


app.use(bodyParser.raw({type: 'multipart/form-data; boundary=<calculated when request is sent>'}))


app.use('/', routes)

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJ0aGlzIGlzIHRoZSBuYW1lIiwibGFzdG5hbWUiOiJ0aGlzIGlzIHRoZSBuYW1lIiwiZW1haWwiOiJlbWFpbEBlbWF1bC5jb20ifSwiaWF0IjoxNjY5OTA2NzEwfQ.wjhvSnKm8YuR4joibkpwHc13qud_oJtLe9Grx0T2o8s';

describe('test the endpoint to check products', function () {

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
