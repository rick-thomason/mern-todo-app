const Todo = require('../models/todo')

const getAllTodos = async (req, res) => {
  const todos = await Todo.find({})
  res.json(todos)
}

const createTodo = async (req, res) => {
  const { name, author, isComplete, date, uuid } = req.body

  let todo = new Todo({
    name,
    author,
    isComplete,
    date,
    uuid
  })

  try {
    todo = await todo.save()
    res.send(todo)
  } catch (err) {
    res.status(500).send(err.message)
    console.log(err.message)
  }
}

const getTodo = async (req, res) => {
  const { id } = req.params
  const todo = await Todo.findById(id)
  res.json(todo)
}

const updateTodo = async (req, res) => {
  const { id } = req.params
  const todo = await Todo.findByIdAndUpdate(id)
  res.send('form to update todo')
}

const deleteTodo = async (req, res) => {
  const { id } = req.params
  try {
    await Todo.findByIdAndDelete(id)
    res.sendStatus(204)
  } catch (err) {
    res.status(500).send(err.message)
    console.log(err.message)
  }
}

module.exports = {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo
}
