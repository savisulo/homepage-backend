const messagesRouter = require("express").Router()
const Message = require("../models/message")

messagesRouter.get("/", (request, response) => {
  Message.find({}).then(messages => {
    response.json(messages)
  })
})

messagesRouter.get("/:id", (request, response, next) => {
  Message.findById(request.params.id)
    .then(message => {
      if (message) {
        response.json(message)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

messagesRouter.post("/", (request, response, next) => {
  const body = request.body

  const message = new Message({
    name: body.name,
    email: body.email,
    subject: body.subject,
    message: body.message,
    date: new Date()
  })

  message.save()
    .then(savedMessage => {
      response.json(savedMessage)
    })
    .catch(error => next(error))
})

module.exports = messagesRouter