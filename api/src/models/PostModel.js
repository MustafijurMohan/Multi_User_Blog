const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!']
    },
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    desc: {
        type: String,
        required: [true, 'Description is required!'],
    },
    photo: {
        type: String,
        required: false
    }
}, {versionKey: false, timestamps: true})



const PostModel = mongoose.model('posts', PostSchema)
module.exports = PostModel