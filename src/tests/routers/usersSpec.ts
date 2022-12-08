import express from 'express'
import supertest from 'supertest'
import bodyParser from "body-parser";
import routes from '../../routes/index'

const app: express.Application = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(bodyParser.raw({type: 'multipart/form-data; boundary=<calculated when request is sent>'}))
app.use('/', routes)
let TOKEN=''
beforeAll(async function() {

    const newUser = {
        firstname: 'first name',
        lastname: "last name",
        email: "userfortoken@email.com",
        password: 'Password',

    }
     await supertest(app)

        .post('/users/register')
        .set('Accept', 'application/json')
        .type('form')
        .send(newUser)

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
describe('test the endpoint to check if it return with user or no', function () {



    it('it should return 200 and the user after add it into database ', async function () {

        const query = {
            firstname: 'test first name',
            lastname: "test last name",
            email: "email1@email.com",
            password: 'Password',
        }

        const response = await supertest(app)

            .post('/users/register')
            .set('Accept', 'application/json')
            .type('form')
            .send(query)

        expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 3, firstname: 'test first name',
            lastname: "test last name",
            email: "email1@email.com",
        });


    })
    // it('it should return 200 and the users after add it into database ', async function () {
    //
    //     const query = {
    //         firstname: 'test first name',
    //         lastname: "test last name",
    //         email: "email2@email.com",
    //         password: 'Password',
    //     }
    //
    //     const response = await supertest(app)
    //
    //         .post('/users')
    //         .auth(TOKEN, {type: 'bearer'})
    //         .set('Accept', 'application/json')
    //         .type('form')
    //         .send(query)
    //
    //     expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
    //     expect(response.status).toEqual(200);
    //     expect(response.body).toEqual({
    //         id: 4, firstname: 'test first name',
    //         lastname: "test last name",
    //         email: "email2@email.com",
    //     });
    //
    //
    // })
    // it('it should return 200 and the user ', async function () {
    //
    //
    //     const response = await supertest(app)
    //
    //         .get('/users/3')
    //         .auth(TOKEN, {type: 'bearer'})
    //         .set('Accept', 'application/json')
    //
    //
    //     expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
    //     expect(response.status).toEqual(200);
    //     expect(response.body).toEqual({
    //         id: 4, firstname: 'test first name',
    //         lastname: "test last name",
    //         email: "email2@email.com",
    //     });
    //
    //
    // })
    // it('it should return 200 and all the users ', async function () {
    //
    //
    //     const response = await supertest(app)
    //
    //         .get('/users')
    //         .auth(TOKEN, {type: 'bearer'})
    //         .set('Accept', 'application/json')
    //
    //
    //     expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
    //     expect(response.status).toEqual(200);
    //     expect(response.body).toEqual([
    //         {
    //             id: 1,
    //             firstname: 'first name',
    //             lastname: "last name",
    //             email: "userfortoken@email.com",
    //
    //
    //         }, {
    //             id: 2,
    //             firstname: 'test first name',
    //             lastname: 'test last name',
    //             email: 'email@email.com'
    //         },
    //         {
    //             id: 3,
    //             firstname: 'test first name',
    //             lastname: 'test last name',
    //             email: 'email1@email.com'
    //         },
    //         {
    //             id: 4,
    //             firstname: 'test first name',
    //             lastname: 'test last name',
    //             email: 'email2@email.com'
    //         }
    //     ]);
    //
    //
    // })
    // it('it should return 200 and the new token ', async function () {
    //     const query = {
    //         email: "email1@email.com",
    //         password: 'Password',
    //     }
    //
    //
    //     const response = await supertest(app)
    //
    //         .post('/users/login')
    //         .set('Accept', 'application/json')
    //         .type('form')
    //         .send(query)
    //
    //
    //     expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
    //     expect(response.status).toEqual(200);
    //
    //
    // })

})
