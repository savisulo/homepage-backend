const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

let messages = [
    {
      id: 1,
      name: 'Niko Hertsa',
      email: 'joku.joku@gmail.com',
      subject: 'message for you',
      message: 'hello from here, I just rented a car!'
    },
    {
      id: 2,
      name: 'Lilli Lallinen',
      email: 'lilli.lallinen@gmail.com',
      subject: 'message',
      message: 'just testing'
    },
    {
      id: 3,
      name: 'Yrjö',
      email: 'joku.yrjo@gmail.com',
      subject: 'hi',
      message: 'minä olen Yrjö'
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})
  
app.get('/api/messages', (req, res) => {
    res.json(messages)
})

app.get('/api/messages/:id', (request, response) => {
    const id = Number(request.params.id)
    const message = messages.find(message => message.id === id)

    if (message) {
        response.json(message)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const maxId = messages.length > 0
      ? Math.max(...messages.map(m => m.id)) 
      : 0
    return maxId + 1
}

app.post('/api/messages', (request, response) => {
    const body = request.body

    if (!body.name || !body.email || !body.subject || !body.message) {
        return response.status(400).json({ 
          error: 'required data missing' 
        })
    }

    const message = {
        id: generateId(),
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message
    }

    messages = messages.concat(message)
    
    response.json(message)
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})