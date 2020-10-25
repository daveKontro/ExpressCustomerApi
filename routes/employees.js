const HttpError = require('standard-http-error')
const Employee = require('../models/Employee')


module.exports = app => {
  const checkForJson = (req, res, next) => {
    const contentType = 'application/json'
    if (!req.is(contentType)) {
      res.json(new HttpError(400, `expects ${contentType}`))
    } else {
      next()
    }
  }
  
  const getNoIdMsg = id => `no employee with id: ${id}`

  // create employee
  app.post('/employees', checkForJson, async (req, res) => {
    const { name, email, amount } = req.body

    const employee = new Employee({ name, email, amount })

    try {
      const newEmployee = await employee.save()
      console.log(newEmployee)
      res.json(201)
    } catch (err) {
      res.json(new HttpError(500, err.message))
    }
  })

  // read all employees
  app.get('/employees', async (req, res) => {
    try {
      const employees = await Employee.find({})
      res.send(employees)
    } catch (err) {
      res.json(new HttpError(400, 'invalid content'))
    }
  })

  // read one employee
  app.get('/employees/:id', async (req, res) => {
    // id is the MongoDB document _id
    try {
      const employee = await Employee.findById(req.params.id)
      res.send(employee)
    } catch (err) {
      res.json(new HttpError(404, getNoIdMsg(req.params.id)))
    }
  })

  // update employee
  app.put('/employees/:id', checkForJson, async (req, res) => {
    try {
      await Employee.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { useFindAndModify: false },
      )
      res.json(200)
    } catch (err) {
      res.json(new HttpError(404, getNoIdMsg(req.params.id)))
    }
  })

  // delete employee
  app.delete('/employees/:id', async (req, res) => {
    try {
      await Employee.findOneAndRemove(
        { _id: req.params.id },
        { useFindAndModify: false },
      )
      res.json(204)
    } catch (err) {
      res.json(new HttpError(404, getNoIdMsg(req.params.id)))
    }
  })
}
