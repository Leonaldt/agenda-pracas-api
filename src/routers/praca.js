const express = require('express')
const Praca = require('../models/praca')
const auth = require('../middleware/auth')
const router = new express.Router()
const cors = require('cors')

app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

router.post('/pracas', async (req, res) => {
    const praca = new Praca(req.body)
    console.log(req.body)
    try {
        await praca.save()
        res.status(201).send(praca)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/pracas', async (req, res) => {

    try {
        const pracas = await Praca.find({})
        res.send(pracas)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/pracas/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const praca = await Praca.findById(_id)

        if (!praca) {
            return res.status(404).send()
        }

        res.send(praca)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/pracas/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['_id', 'nome', 'endereco', 'locais']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const praca = await Praca.findById(req.params.id)

        if (!praca) {
            return res.status(404).send()
        }

        updates.forEach((update) => praca[update] = req.body[update])
        await praca.save()
        res.send(praca)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/pracas/:id', async (req, res) => {
    try {
        const praca = await Praca.findByIdAndDelete(req.params.id)

        if (!praca) {
            return res.status(404).send()
        }

        res.send(praca)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router