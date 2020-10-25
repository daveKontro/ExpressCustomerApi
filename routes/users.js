const HttpError = require('standard-http-error')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../auth')
const { 
  JWT_SECRET,
  JWT_ALGORITHM,
} = require('../config')


module.exports = app => {
  // register user
  app.post('/register', (req, res) => {
    const { loginId, password } = req.body

    const user = new User({ loginId, password })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        // hash password
        user.password = hash
        
        // save user
        try {
          const newUser = await user.save()
          console.log(newUser)
          res.json(201)
        } catch(err) {
          res.json(new HttpError(500, err.message))
        }
      })
    })
  })

  // auth user
  app.post('/auth', async (req, res) => {
    const { loginId, password } = req.body

    try {
      // authenticate user
      const user = await auth.authenticate(loginId, password)

      // create jwt (json web token)
      const token = jwt.sign(user.toJSON(), JWT_SECRET, {
        algorithm: JWT_ALGORITHM,
        expiresIn: '60m',
      })

      // respond with: issued at, expiration, token
      const { iat, exp } = jwt.decode(token)
      res.send({ iat, exp, token })
    } catch(err) {
      // user unauthorized
      res.json(new HttpError(401, err.message))
    }
  })
}