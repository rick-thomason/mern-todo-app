const User = require('../models/user')

const createUser = async (req, res) => {
  const { name, email, password } = req.body
  const user = new User({ name, email, password })
  try {
    user = await user.save()
    res.status(201).send({ user })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const loginUser = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.send('user not found')
      }
      if (user.password !== password) {
        return res.send('wrong password')
      }
      res.send('user logged in')
    })
    .catch(err => res.json(err))
}

const renderRegister = (req, res) => {
  res.send('register form')
}

const renderLogin = (req, res) => {
  res.send('login form')
}

module.exports = {
  createUser,
  loginUser,
  renderRegister,
  renderLogin
}
