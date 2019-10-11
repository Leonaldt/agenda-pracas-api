const mongoose = require('mongoose')

const agendaSchema = new mongoose.Schema({
    data_hora: {
        type: Date,
        required: true
    }, 
    interessado: {
        type: String,
        required: true,
        trim: true
    },
    telefone: {
        type: String,
        required: true,
        trim: true
    },
    evento: {
        type: String,
        required: true,
        trim: true  
    },
    situacao: {
        type: String,
        default: 'Em andamento',
        trim: true  
    },
    documento: {
        type: String,
        required: true,
        trim: true  
    },
    data_protocolo: {
        type: Date,
        required: true  
    },
    publico: {
        type: String,
        required: true,
        trim: true  
    },
    obs: {
        type: String,
        trim: true  
    },
    local: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Praca'
    },
    local_evento: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const Agenda = mongoose.model('Agenda', agendaSchema)

module.exports = Agenda