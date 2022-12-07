import express from 'express'
import supertest from 'supertest'
import bodyParser from "body-parser";
import routes from '../../routes/index'

const app: express.Application = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(bodyParser.raw({type: 'multipart/form-data; boundary=<calculated when request is sent>'}))
app.use('/', routes)

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJ0aGlzIGlzIHRoZSBuYW1lIiwibGFzdG5hbWUiOiJ0aGlzIGlzIHRoZSBuYW1lIiwiZW1haWwiOiJlbWFpbEBlbWF1bC5jb20ifSwiaWF0IjoxNjY5OTA2NzEwfQ.wjhvSnKm8YuR4joibkpwHc13qud_oJtLe9Grx0T2o8s";

describe('test the endpoint to check if it return with an image or no', function () {
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
            id: 2, firstname: 'test first name',
            lastname: "test last name",
            email: "email1@email.com",
        });


    })
    it('it should return 200 and the users after add it into database ', async function () {

        const query = {
            firstname: 'test first name',
            lastname: "test last name",
            email: "email2@email.com",
            password: 'Password',
        }

        const response = await supertest(app)

            .post('/users')
            .auth(TOKEN, {type: 'bearer'})
            .set('Accept', 'application/json')
            .type('form')
            .send(query)

        expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 3, firstname: 'test first name',
            lastname: "test last name",
            email: "email2@email.com",
        });


    })
    it('it should return 200 and the user ', async function () {


        const response = await supertest(app)

            .get('/users/3')
            .auth(TOKEN, {type: 'bearer'})
            .set('Accept', 'application/json')


        expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 3, firstname: 'test first name',
            lastname: "test last name",
            email: "email2@email.com",
        });


    })
    it('it should return 200 and all the users ', async function () {


        const response = await supertest(app)

            .get('/users')
            .auth(TOKEN, {type: 'bearer'})
            .set('Accept', 'application/json')


        expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([
            {
                id: 1,
                firstname: 'test first name',
                lastname: 'test last name',
                email: 'email@email.com'
            },
            {
                id: 2,
                firstname: 'test first name',
                lastname: 'test last name',
                email: 'email1@email.com'
            },
            {
                id: 3,
                firstname: 'test first name',
                lastname: 'test last name',
                email: 'email2@email.com'
            }
        ]);


    })
    it('it should return 200 and the new token ', async function () {
        const query = {
            email: "email1@email.com",
            password: 'Password',
        }


        const response = await supertest(app)

            .post('/users/login')
            .set('Accept', 'application/json')
            .type('form')
            .send(query)


        expect(response.headers['content-type']).toMatch('application/json; charset=utf-8')
        expect(response.status).toEqual(200);


    })

})
