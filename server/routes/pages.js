var
  express = require('express'),
  pagesRouter = express.Router(),
  pagesCtrl = require('../controllers/pages.js')

pagesRouter.route('/pages')
  .get(pagesCtrl.index)
  .post(pagesCtrl.create)

pagesRouter.route('/pages/:id')
  .get(pagesCtrl.show)
  .patch(pagesCtrl.update)
  .delete(pagesCtrl.destroy)

module.exports = pagesRouter
