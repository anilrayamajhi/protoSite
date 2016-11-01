var
  Page = require('../models/Page.js'),
  User = require('../models/User.js')

module.exports = {
  index:index,
  show:show,
  create:create,
  update:update,
  destroy:destroy
}

function index(req, res) {
  Page.find(req.body).sort({createdAt: 'desc'}).populate('_by User').exec(function(err, pages) {
    console.log(req.user);
    console.log(req.body);
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
  Page.findById(req.user).populate('User').exec(function(err, body) {
    if(err) console.log(err);
    var newPage = new Page();
    newPage._by = req.user._id;
    newPage.pageUrl = req.body.pageUrl
    newPage.save(function(err){
        if(err) console.log(err);
        res.json({success: true, message: "Page created!🤘🏿", page: body})
    })
    })
}

function update(req, res) {
  Page.findByIdAndUpdate(req.params.id, req.body, {new: true},function(err, page) {
    if(err) return console.log(err)
    res.json({success: true, message: "Page updated!", page: page})
  })
}

function destroy(req, res) {
  Page.findByIdAndRemove(req.params.id, function(err) {
    if(err) return console.log(err)
    res.json({success: true, message: "Page deleted 😪"})
  })
}
