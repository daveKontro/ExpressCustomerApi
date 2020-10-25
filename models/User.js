const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
  loginId: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User