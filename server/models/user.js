const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name     : {
    type      : String,
    required  : true,
    minlength : 3,
    maxlength : 30
  },

  email    : {
    type     : String,
    required : true,
    unique   : true
  },
  password : {
    type      : String,
    required  : true,
    minlength : 6,
    maxlength : 1024
  }
})

module.exports = mongoose.model('User', UserSchema)
