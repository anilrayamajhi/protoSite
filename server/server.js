var
  dotenv = require('dotenv').load({silent: true}),
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  request = require('request'),
  Yelp = require('yelp'),
  server = require('http').createServer(app),
  // apiRoutes = require('./routes/cars.js'),
  PORT = process.env.port || 7000


  var yelp = new Yelp({
    consumer_key: process.env.YELP_CONSUMER_KEY,
    consumer_secret: process.env.YELP_CONSUMER_SECRET,
    token: process.env.YELP_ACCESS_TOKEN,
    token_secret: process.env.YELP_ACCESS_TOKEN_SECRET
  })

// mongoose.connect('mongodb://localhost/factories-practice', function(err) {
//   console.log(err || "Connected to MongoDB (factories-practice)")
// })

console.log(yelp);

app.use(logger('dev'))
app.use(bodyParser.json())
// app.use(express.static('client'))

app.get('/api', function(req, res){
  yelp.business('caressa-beauty-salon-culver-city', function(err, data) {
    if (err) return console.log(error);
    res.send(data)
  });
})

// app.get('*', function(req, res) {
//   res.sendFile('/client/index.html', {root: './'})
// })

server.listen(PORT, function(err) {
  console.log(err || "Server running on port " + PORT)
})
