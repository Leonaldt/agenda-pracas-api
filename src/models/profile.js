const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    roles: [{
        type: String,
    }]
}, {
    timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile