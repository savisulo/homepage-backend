require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const Message = require("./models/message")

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(cors())
app.use(express.json())
app.use(express.static("build"))

app.get("/api/messages", (request, response) => {
  Message.find({}).then(messages => {
    response.json(messages)
  })
})

app.get("/api/messages/:id", (request, response, next) => {
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

app.post("/api/messages", (request, response, next) => {
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

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})