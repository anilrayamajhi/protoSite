// user model
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new Schema({
  username: String,
  password: String,
  pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
})

//password encryption
userSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model('User', userSchema)
