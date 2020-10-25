'use strict'
const dotenv = require('dotenv')

const result = dotenv.config()

// 1) create a .env file
// 2) add env variables:
//      NODE_ENV=development
//      PORT=3000
//      URL=http://localhost:3000
//      LOG_LEVEL=dev
//      MONGODB_URI=<my-atlas-conn-string>
//      JWT_SECRET=<my-secret>
//      JWT_ALGORITHM=HS256
// 3) add .env to .gitignore

const formatVars = variables => {
  let exportVars = {}
  Object.entries(variables).map(([key, value]) => {
    if (['true', 'false'].includes(value)) exportVars[key] = (/true/i).test(value)
    else exportVars[key] = value
  })
  return exportVars
}

module.exports = formatVars(result.parsed)