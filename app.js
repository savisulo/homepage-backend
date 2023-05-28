const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")
const messagesRouter = require("./controllers/messages")

mongoose.set("strictQuery", false)

logger.info("connecting to", config.url)

mongoose.connect(config.url)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use("/api/messages", messagesRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app