const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Username is required!']
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, 'Email is required!'],
        validate: {
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },
            message: 'Valid Email is Required!'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    },
    profilePic: {
        type: String,
        default: ''
    }
    
}, {versionKey: false, timestamps: true})

// Hash the Password
UserSchema.pre('save', async function(next) {
    const user = this
    if(!user.isModified('password')) {
        next()
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(user.password, salt)
        user.password = hash_password
    } catch (err) {
        next(err)
    }
})


const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel



