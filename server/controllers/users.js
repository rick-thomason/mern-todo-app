const User = require('../models/user')

const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  let user = new User({ name, email, password })
  try {
    user = await user.save()
    res.status(201).send({ user })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).send('user not found')
    }
    if (user.password !== password) {
      return res.status(401).send('wrong password')
    }
    res.send('user logged in')
  } catch (err) {
    res.status(400).send(err.message)
  }
}

const renderRegister = (req, res) => {
  res.send('register form')
}

const renderLogin = (req, res) => {
  res.send('login form')
}

module.exports = {
  registerUser,
  loginUser,
  renderRegister,
  renderLogin
}
