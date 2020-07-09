const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const pracaRouter = require('./routers/praca')
const agendaRouter = require('./routers/agenda')

const cors = require('cors')
const app = express()
const port = process.env.PORT

app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(express.json())
app.use(userRouter)
app.use(pracaRouter)
app.use(agendaRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})