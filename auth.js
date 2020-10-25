const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')


const User = mongoose.model('User')

exports.authenticate = (loginId, password) => {
  const authFailed = 'authentication failed'

  return new Promise(async (resolve, reject) => {
    try {
      // get user by login id
      const user = await User.findOne({ loginId })

      // match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          resolve(user)
        } else {
          // password didn't match
          reject(authFailed)
        }
      })
    } catch(err) {
      // login id not found
      reject(authFailed)
    }
  })
}