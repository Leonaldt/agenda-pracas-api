const express = require('express')
const Profile = require('../models/profile')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/profiles', auth, async (req, res) => {
    const praca = new Profile(req.body)

    try {
        await praca.save()
        res.status(201).send(praca)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/profiles', auth, async (req, res) => {

    try {
        const profiles = await Profile.find({})
        res.send(profiles)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/profiles/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const praca = await Profile.findById(_id)

        if (!praca) {
            return res.status(404).send()
        }

        res.send(praca)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/profiles/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['_id', 'description', 'roles']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const praca = await Profile.findById(req.params.id)

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

router.delete('/profiles/:id', auth, async (req, res) => {
    try {
        const praca = await Profile.findByIdAndDelete(req.params.id)

        if (!praca) {
            return res.status(404).send()
        }

        res.send(praca)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router