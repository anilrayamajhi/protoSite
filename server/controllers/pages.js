var
  Page = require('../models/Page.js')

module.exports = {
  index:index,
  show:show,
  create:create,
  update:update,
  destroy:destroy
}

function index(req, res) {
  Page.find({}, function(err, pages) {
    if(err) return console.log(err)
    res.json(pages)
  })
}

function show(req, res) {
  Page.findById(req.params.id, function(err, page) {
    if(err) return console.log(err)
    res.json(page)
  })
}

function create(req, res) {
  Page.create(req.body, function(err, page) {
    if(err) return console.log(err)
    res.json({success: true, message: "Page created!🤘🏿", page: page})
  })
}

function update(req, res) {
  Page.findByIdAndUpdate(req.params.id, req.body, {new: true},function(err, page) {
    if(err) return console.log(err)
    res.json({success: true, message: "Page updated! 🚙", page: page})
  })
}

function destroy(req, res) {
  Page.findByIdAndRemove(req.params.id, function(err) {
    if(err) return console.log(err)
    res.json({success: true, message: "Page deleted 😪"})
  })
}
