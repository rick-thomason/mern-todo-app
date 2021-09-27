const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const todoRoutes = require('./routes/todos')

require('dotenv').config()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/todos', todoRoutes)

// Set up mongoose to use the MongoDB database
mongoose
  .connect('mongodb://localhost:27017/mern_todo_app', {
    useNewUrlParser    : true,
    useUnifiedTopology : true
  })
  .then(() => {
    console.log('CONNECTED TO MongoDB LOCALLY...')
  })
  .catch(err => {
    console.log('OH NO AN ERROR!!!')
    console.log(err)
  })

// Set up the express app
app.get('/', (req, res) => {
  res.send('Hello Fuckers!')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
