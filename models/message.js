const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    required: true
  },
  email: {
    type: String,
    minlength: 2,
    validate: {
      validator: function(v) {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)
      },
      message: props => `${props.value} is not a valid email address`
    },
    required: true
  },
  subject: {
    type: String,
    minlength: 1,
    required: true
  },
  message: {
    type: String,
    minlength: 2,
    required: true
  },
  date: Date
})

messageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Message", messageSchema)