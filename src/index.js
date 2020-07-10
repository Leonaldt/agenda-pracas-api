const express = require('express')
const cors = require('cors')
const app = express()

require('./db/mongoose')
const userRouter = require('./routers/user')
const pracaRouter = require('./routers/praca')
const agendaRouter = require('./routers/agenda')

const port = 3001

var whitelist = ['http://localhost:4200', 'https://agenda-pracas-app.herokuapp.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(userRouter)
app.use(pracaRouter)
app.use(agendaRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})