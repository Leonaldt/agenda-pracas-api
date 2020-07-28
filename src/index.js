const express = require('express')
require('./db/mongoose')

const cors = require('cors')

const userRouter = require('./routers/user')
const pracaRouter = require('./routers/praca')
const agendaRouter = require('./routers/agenda')

const app = express()
const port = process.env.PORT

// Maintenance mode
// app.use((req, res, next) => {
//   res.status(503).send('Site is currently down. Check back soon!')
// })

var whitelist = ['http://localhost:4200', 'https://agenda-pracas-app.herokuapp.com']
var corsOptions = {
  origin: function (origin, callback) {
    console.log('origin: ', origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// app.use(cors(corsOptions))

app.use(express.json())
app.use(userRouter)
app.use(pracaRouter)
app.use(agendaRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})