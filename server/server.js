var
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  Yelp = require('yelp'),
  // apiRoutes = require('./routes/cars.js'),
  PORT = process.env.port || 7000


  var yelp = new Yelp({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  })

// mongoose.connect('mongodb://localhost/factories-practice', function(err) {
//   console.log(err || "Connected to MongoDB (factories-practice)")
// })

console.log(yelp);

app.use(logger('dev'))
app.use(bodyParser.json())
// app.use(express.static('client'))

app.use('/api', function(req, res){
  res.json({message: "YO YO YO"})
})

// app.get('*', function(req, res) {
//   res.sendFile('/client/index.html', {root: './'})
// })
yelp.business('caressa-beauty-salon-culver-city', function(err, data) {
  if (err) return console.log(error);
  console.log(data);
});

app.listen(PORT, function(err) {
  console.log(err || "Server running on port " + PORT)
})
