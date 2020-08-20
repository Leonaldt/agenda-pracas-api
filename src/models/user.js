const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./praca')
const Profile = require('../models/profile')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('O email é inválido')
            }
        }
    },
    password: {
        type: String,
        // required: true,
        // minlength: 7,
        // trim: true,
        // validate(value) {
        //     if (value.toLowerCase().includes('password')) {
        //         throw new Error('Password cannot contain "password"')
        //     }
        // }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    },
    profiles: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Profile'
        },
        description: {
            type: String
        },
    }]
}, {
    timestamps: true
})

// userSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'owner'
// })

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    delete userObject.createdAt
    delete userObject.updatedAt
    delete userObject.__v

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this

    let roles = []

    for (let i = 0; i < user.profiles.length; i++) {
        const profile = await Profile.findById(user.profiles[i]._id)
        roles = roles.concat(profile.roles)
    }

    const token = jwt.sign({ _id: user._id.toString(), name: user.name, email: user.email, profiles: user.profiles, roles }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.generateAuthTokenRecoveryPassword = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString(), name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h'})
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User