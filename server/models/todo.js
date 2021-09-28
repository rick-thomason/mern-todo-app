const mongoose = require('mongoose')
const { Schema } = mongoose

const todoSchema = new Schema({
  name       : {
    type      : String,
    required  : true,
    minlength : 3,
    maxlength : 200
  },
  author     : {
    type      : String,
    minlength : 3,
    maxlength : 30
  },
  uuid       : {
    type : String
  },
  date       : {
    type    : Date,
    default : new Date()
  },
  isComplete : {
    type    : Boolean,
    default : false
  }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
