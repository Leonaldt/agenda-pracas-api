const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const pracaRouter = require('./routers/praca')
const agendaRouter = require('./routers/agenda')

const app = express()
const port = process.env.PORT

var allowedOrigins = ['https://agenda-pracas.herokuapp.com'];

app.use(express.json())
app.use(userRouter)
app.use(pracaRouter)
app.use(agendaRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})