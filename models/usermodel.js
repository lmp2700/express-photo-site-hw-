const mongoose = require('mongoose')
const Photos = require('./photomodel');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true},
    photos: [Photos.schema]
})

module.exports = mongoose.model('Users', userSchema)