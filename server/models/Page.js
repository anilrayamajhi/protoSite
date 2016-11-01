var
  mongoose = require('mongoose'),
  pageSchema = new mongoose.Schema({
    pageUrl: String
  }, {timestamps: true})

var Page = mongoose.model('Page', pageSchema)
module.exports = Page
