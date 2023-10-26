const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    unique: true,
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  tasks: Array
})

module.exports = mongoose.model('User', userSchema)
