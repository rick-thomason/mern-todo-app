const express = require('express')
const router = express.Router()
const { registerUser, loginUser, renderRegister, renderLogin } = require('../controllers/users')

router.get('/register', renderRegister).post('/register', registerUser)
router.get('/login', renderLogin).post('/login', loginUser)

module.exports = router
