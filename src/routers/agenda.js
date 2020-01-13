const express = require('express')
const Agenda = require('../models/agenda')
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

router.post('/agenda', async (req, res) => {
    const agenda = new Agenda(req.body)

    try {
        await agenda.save()
        res.status(201).send(agenda)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/agenda', async (req, res) => {

    try {
        const agendas = await Agenda.find()
        res.send(agendas)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/agenda/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const agenda = await Agenda.findById(_id)

        if (!agenda) {
            return res.status(404).send()
        }

        res.send(agenda)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/agenda/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['_id', 'data_hora', 'interessado', 'telefone', 'evento', 'situacao', 'documento', 'data_protocolo', 'publico', 'obs', 'local', 'local_evento']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const agenda = await Agenda.findById(req.params.id)

        if (!agenda) {
            return res.status(404).send()
        }

        updates.forEach((update) => agenda[update] = req.body[update])
        await agenda.save()
        res.send(agenda)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/agenda/:id', async (req, res) => {
    try {
        const agenda = await Agenda.findByIdAndDelete(req.params.id)

        if (!agenda) {
            return res.status(404).send()
        }

        res.send(agenda)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router