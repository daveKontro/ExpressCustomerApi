const express = require('express')
const ejwt = require('express-jwt')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const {
  PORT,
  LOG_LEVEL,
  MONGODB_URI,
  JWT_SECRET,
  JWT_ALGORITHM,
} = require('./config')


const app = express()

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan(LOG_LEVEL))

// protect routes
// NOTE: to protect only specific routes 
// comment below out and use ejwt() inline
app.use(ejwt({
  secret: JWT_SECRET, 
  algorithms: [JWT_ALGORITHM],
}).unless({
  path: ['/register', '/auth']
}))

app.listen(PORT, () => {
  mongoose.connect(
    MONGODB_URI, 
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
})

const db = mongoose.connection

db.on('error', err => console.log(err))

db.once('open', () => {
  require('./routes/employees')(app)
  require('./routes/users')(app)
  console.log(`server started on port: ${PORT}`)
})