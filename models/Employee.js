const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')


const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    default: 0,
  }
})

EmployeeSchema.plugin(timestamp)

const Employee = mongoose.model('Employee', EmployeeSchema)

module.exports = Employee