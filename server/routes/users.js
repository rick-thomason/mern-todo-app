const express = require('express')
const router = express.Router()
const { createUser, loginUser, renderRegister, renderLogin } = require('../controllers/users')

router.get('/register', renderRegister).post('/register', createUser)
router.get('/login', renderLogin).post('/login', loginUser)

module.exports = router
