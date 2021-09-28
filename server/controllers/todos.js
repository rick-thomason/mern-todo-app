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

module.exports = {
  getAllTodos,
  createTodo
}
