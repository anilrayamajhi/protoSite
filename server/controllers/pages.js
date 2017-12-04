var
  Page = require('../models/Page.js'),
  User = require('../models/User.js'),
  Yelp = require('yelp'),
  _ = require('underscore')



  //Yelp API Aouth Token
    var yelp = new Yelp({
      consumer_key: process.env.YELP_CONSUMER_KEY,
      consumer_secret: process.env.YELP_CONSUMER_SECRET,
      token: process.env.YELP_ACCESS_TOKEN,
      token_secret: process.env.YELP_ACCESS_TOKEN_SECRET
    })

module.exports = {
  index:index,
  show:show,
  create:create,
  update:update,
  destroy:destroy
}

function index(req, res) {
  Page.find({}).sort({createdAt: 'desc'}).populate('_by User').exec(function(err, pages) {
    if(req.user === undefined) return console.log("need user");
    console.log(req.user._id);
    // console.log(pages);
    // console.log(_.where(pages, {_by}));
    if(err) return console.log(err)
    newArr = _.map(pages, function(el){if((el._by._id).toString() == req.user._id){return el}});
    console.log(newArr);
    res.json(newArr);
  })
}

function show(req, res) {
  Page.findById(req.params.id).populate('_by').exec(function(err, page) {
    if(err) return console.log(err)
    yelp.business(page.pageUrl.slice(25), function(err, data) {

        if(!!data){
        if (err) return console.log('SINGLE PAGE ERROR',error);
        res.json(data)
        }
        else {console.log("GANEY from BE: ");
        res.json(null)
      }
        // res.json({success: false})}
      });
  })
}

function create(req, res) {
  Page.findOne({pageUrl: req.body.pageUrl}, function(err, pbody){
    if (err) return console.log('IDK ERROR', err);
    // if(!!pbody) return res.json({success:false,message: "Already page bro", pbody});
    // console.log('PBODY: ',pbody);
  Page.findById(req.user).populate('User').exec(function(err, body) {
    if(err) return console.log(err);

      var newPage = new Page();
      newPage._by = req.user._id;
      newPage.pageUrl = req.body.pageUrl
      newPage.save(function(err){
          if(err) console.log(err);
          res.json({success: true, message: "Page created!🤘🏿"})
      })
    })
    })
}

// function create(req, res){
//   Page.findById(req.user).populate('User').exec()
//     .then(function(body){
//
//     })
// }


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
