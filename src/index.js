const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const pracaRouter = require('./routers/praca')
const agendaRouter = require('./routers/agenda')

const app = express()
const port = process.env.PORT

var allowedOrigins = ['http://localhost:4200', 'https://agenda-pracas.herokuapp.com/'];

app.use(express.json())
app.use(userRouter)
app.use(pracaRouter)
app.use(agendaRouter)
//app.use(cors())
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})