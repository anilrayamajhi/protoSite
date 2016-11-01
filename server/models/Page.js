var
  mongoose = require('mongoose'),
  pageSchema = new mongoose.Schema({
    _by: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    pageUrl: String
  }, {timestamps: true})

var Page = mongoose.model('Page', pageSchema)
module.exports = Page
