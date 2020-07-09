const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const pracaRouter = require('./routers/praca')
const agendaRouter = require('./routers/agenda')

const cors = require('cors')
const app = express()
const port = process.env.PORT

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json())
app.use(userRouter)
app.use(pracaRouter)
app.use(agendaRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})