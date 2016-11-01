var
  express = require('express')
  usersRouter = express.Router(),
  usersCtrl = require('../controllers/users.js')

usersRouter.post('/register', usersCtrl.register)


usersRouter.post('/login', usersCtrl.login)

usersRouter.get('/logout', usersCtrl.logout)

usersRouter.get('/status', usersCtrl.status)


module.exports = usersRouter
