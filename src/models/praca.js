const mongoose = require('mongoose')

const pracaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    endereco: {
        type: String,
        required: true,
        trim: true
    },
    locais: [{
        local: {
            type: String,
            required: true,
            trim: true
        }
    }]
}, {
    timestamps: true
})

const Praca = mongoose.model('Praca', pracaSchema)

module.exports = Praca