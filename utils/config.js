require("dotenv").config()

let PORT = process.env.PORT
let url = process.env.MONGODB_URI

module.exports = {
  PORT,
  url
}