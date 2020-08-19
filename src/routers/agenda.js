const express = require('express')
const Agenda = require('../models/agenda')
const auth = require('../middleware/auth')
const router = new express.Router()
const moment = require('moment-timezone');

router.post('/agenda', auth, async (req, res) => {

    console.log('Schedule => ', req.body)

    const agenda = new Agenda(req.body)

    try {
        await agenda.save()
        res.status(201).send(agenda)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/agenda', auth, async (req, res) => {

    const match = {}
    const sort = {}

    if (req.query.situacao)
        match.situacao = req.query.situacao

    if (req.query.startDate && req.query.endDate) {
        match.data_inicio = {
            $gte: moment(req.query.startDate),
            $lt: moment(req.query.endDate)
        }

        match.data_fim = {
            $gte: moment(req.query.startDate),
            $lt: moment(req.query.endDate)
        }
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        const agendas = await Agenda.find(match).sort(sort).populate({
            path: 'local',
            // match,
            // options: {
            //     limit: parseInt(req.query.limit),
            //     skip: parseInt(req.query.skip),
            //     sort
            // }
        }).exec()
        res.send(agendas)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/agenda/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const agenda = await Agenda.findById(_id)
        await agenda.populate('local').execPopulate()

        if (!agenda) {
            return res.status(404).send()
        }

        res.send(agenda)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/agenda/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['_id', 'data_inicio', 'data_fim', 'interessado', 'telefone', 'evento', 'situacao', 'documento', 'data_protocolo', 'publico', 'obs', 'local', 'local_evento']
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

router.delete('/agenda/:id', auth, async (req, res) => {
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