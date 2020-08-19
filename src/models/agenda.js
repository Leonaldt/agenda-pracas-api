const mongoose = require('mongoose')

const agendaSchema = new mongoose.Schema({
    data_inicio: {
        type: Date,
        required: true,
    },
    data_fim: {
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
        enum: ['Em andamento', 'Concluido', 'Fechado'],
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

// agendaSchema.pre('save', async function (next) {
//     var self = this;

//     const match = {}
    
//     match.data_inicio = {
//         $gte: self.data_inicio, // >=
//         $lt: self.data_fim // <=
//     }
    
//     match.data_fim = {
//         $gte: self.data_inicio,
//         $lt: self.data_fim
//     }
    
//     console.log(match)

//     await Agenda.find(match, function (err, docs) {
//         if (docs.length) {
//             console.log('date exists')
//             next(new Error("Date exists!"))
//         }

//         next()
//     })
// })

const Agenda = mongoose.model('Agenda', agendaSchema)

module.exports = Agenda