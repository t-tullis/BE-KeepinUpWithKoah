const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    body:{
        type: String,
        minlength: 10
    }
}, {timestamps: true})

module.exports = mongoose.model('post', postSchema)