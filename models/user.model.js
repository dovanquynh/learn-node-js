const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    avatar: String
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User