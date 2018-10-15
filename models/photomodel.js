const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    caption: String,
    location: String,
})

module.exports = mongoose.model('Photos', photoSchema)