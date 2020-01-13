const express = require('express')
const Praca = require('../models/praca')
const auth = require('../middleware/auth')
const router = new express.Router()

// Add headers
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200', 'https://agenda-pracas.herokuapp.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

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
    const allowedUpdates = ['nome', 'endereco', 'locais']
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