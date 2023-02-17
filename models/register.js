const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'email must be provided']
    },
    phone: {
        type: Number,
        required: true,
    },
    work: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    messages: [{
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: [true, 'email must be provided']
        },
        phone: {
            type: Number,
            required: true,
        },
        message: {
            type: String,
            required: true
        }
    }],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

registerUser.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
        this.cpassword = await bcrypt.hash(this.cpassword, 10)
    }
    next()
})

// generating tokens here

registerUser.methods.generateAuthToken = async function () {
    try {
        let myToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: myToken })
        await this.save()
        return myToken
    } catch (err) {
        console.log(err)
    }
}

registerUser.methods.sendMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name, email, phone, message })
        await this.save()
        return this.messages
    } catch (err) {
        console.log(err)
    }
}

const Register = mongoose.model('RegisterUser', registerUser)
module.exports = Register