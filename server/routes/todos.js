const express = require('express')
const { getAllTodos, createTodo } = require('../controllers/todos')
const router = express.Router()

router.route('/').get(getAllTodos).post(createTodo)

module.exports = router
