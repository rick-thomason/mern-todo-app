const Todo = require('../models/todo')
const Joi = require('joi')

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ date: -1 })
    res.send(todos)
  } catch (err) {
    res.status(500).send(err.message)
    console.log(err.message)
  }
}

const createTodo = async (req, res) => {
  const schema = Joi.object({
    name       : Joi.string().min(3).max(200).required(),
    author     : Joi.string().min(3).max(30).required(),
    uid        : Joi.string(),
    isComplete : Joi.boolean(),
    date       : Joi.date()
  })

  const { value, error } = schema.validate(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  const { name, author, isComplete, date, uid } = req.body

  let todo = new Todo({
    name,
    author,
    isComplete,
    date,
    uid
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
  res.send(todo)
}

const updateTodo = async (req, res) => {
  const schema = Joi.object({
    name       : Joi.string().min(3).max(200).required(),
    author     : Joi.string().min(3).max(30).required(),
    uid        : Joi.string(),
    isComplete : Joi.boolean(),
    date       : Joi.date()
  })

  const { value, error } = schema.validate(req.body)

  if (error) return res.status(400).send(error.details[0].message)
  const { id } = req.params

  try {
    const todo = await Todo.findById(id)
    if (!todo) return res.status(404).send('Todo not found')

    const { name, author, isComplete, date, uid } = req.body
    const updatedTodo = await Todo.findByIdAndUpdate(id, { name, author, isComplete, date, uid }, { new: true })

    res.send(updatedTodo)
  } catch (err) {
    res.status(500).send(err.message)
    console.log(err.message)
  }
}

const deleteTodo = async (req, res) => {
  const { id } = req.params

  try {
    const todo = await Todo.findById(id)

    if (!todo) return res.status(404).send('Todo not found')

    const deletedTodo = await Todo.findByIdAndDelete(id)
    res.send(todo)
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
