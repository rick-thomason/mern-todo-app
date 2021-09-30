const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const todoRoutes = require('./routes/todos')
const userRoutes = require('./routes/users')

require('dotenv').config()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/todos', todoRoutes)
app.use('/api/users', userRoutes)

// Set up mongoose to use the MongoDB database
const server = 'localhost:27017'
const database = 'mern_todo_app'

mongoose
  .connect(`mongodb://${server}/${database}`, {
    useNewUrlParser    : true,
    useUnifiedTopology : true
  })
  .then(() => {
    console.log('CONNECTED TO MongoDB...')
  })
  .catch(err => {
    console.log('OH NO AN ERROR!!!')
    console.log(err)
  })

// Set up the express app
app.get('/', (req, res) => {
  res.send('Hello Fuckers!')
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
