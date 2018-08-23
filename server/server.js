console.log("App started");
//Dependencies
var
  dotenv = require('dotenv').load({silent: true}),
  express = require('express'),
  //instance of express
  app = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  bodyParser = require('body-parser'),
  hash = require('bcrypt-nodejs'),
  path = require('path'),
  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  socketIO = require('socket.io'),
  http = require('http').Server(app),
  socketServer = socketIO(http);
  Yelp = require('yelp'),
  MongoStore = require('connect-mongo')(expressSession),
  // user schema/model
  User = require('./models/User.js'),

  // require routes
  usersRoutes = require('./routes/users.js'),
  pagesRoutes = require('./routes/pages.js'),

  //mongo variable
  mongoConnection = process.env.MONGO_URL,

//Port declaration
  PORT = process.env.PORT || 7000

//Yelp API Aouth Token
  var yelp = new Yelp({
    consumer_key: process.env.YELP_CONSUMER_KEY,
    consumer_secret: process.env.YELP_CONSUMER_SECRET,
    token: process.env.YELP_ACCESS_TOKEN,
    token_secret: process.env.YELP_ACCESS_TOKEN_SECRET
  })

mongoose.connect(mongoConnection, function(err) {
  console.log(err || "Connected to MongoDB (protoSite)")
})

// console.log(yelp);

// app.get('/api', function(req, res){
//   yelp.business('caressa-beauty-salon-culver-city', function(err, data) {
//     if (err) return console.log(error);
//     res.send(data)
//   });
// })

// app.get('*', function(req, res) {
//   res.sendFile('/client/index.html', {root: './'})
// })





// define middleware
app.use(express.static(path.join(__dirname, '../client')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(require('express-session')({
    secret: 'GI',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({url: mongoConnection})
}))
app.use(passport.initialize())
app.use(passport.session())
// app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/user/', usersRoutes)
app.use('/api/', pagesRoutes)

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '../client', 'index.html'))
// })

app.use(function(req, res, next){
  if(req.user) req.app.currentUser = req.user
  req.app.loggedIn = !!req.user
  next()
})

// error hndlers
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res) {
  res.status(err.status || 500)
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }))
})

socketServer.on('connection', function(socket){
  console.log('A client connected');

    socket.on('chat message', function(info){
      console.log(info);
      socketServer.emit('finish', info);
    })


    socket.on('disconnect', function(socket){
      console.log('A client is disconnected');
    });
})


http.listen(PORT, function(err) {
  console.log(err || "Server running on port " + PORT)
})
