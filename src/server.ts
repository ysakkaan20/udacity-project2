import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/index'

const app: express.Application = express()
const address: string = '0.0.0.0:3000'
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use(bodyParser.raw({ type: 'multipart/form-data; boundary=<calculated when request is sent>' }))


app.use('/', routes)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
