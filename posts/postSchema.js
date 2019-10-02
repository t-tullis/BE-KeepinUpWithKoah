const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    body:{
        type: String,
        minlength: 10,
        required: true
    },
    category: { 
        type: String,
        required: true,
    },
    previewImg:{
        type: String
    },
    postImage1: {
        type: String
    },
    postImage2: {
        type: String
    },
    postImage3: {
        type: String
    }
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'user',
    // }
}, {timestamps: true})

module.exports = mongoose.model('post', postSchema)