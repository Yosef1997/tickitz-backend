const routes = require('express').Router()
const dateController = require('../controllers/showdate')
const authMiddleware = require('../middlewares/auth')

routes.get('/showdate', dateController.listDate)
routes.get('/showdate/:id', dateController.detailDate)

routes.get('/admin/showdate', authMiddleware.authCheck, dateController.listDate)
routes.get('/admin/showdate/:id', authMiddleware.authCheck, dateController.detailDate)
routes.post('/admin/showdate', authMiddleware.authCheck, dateController.creatDate)
routes.put('/admin/showdate', authMiddleware.authCheck, dateController.updateDate)
routes.patch('/admin/showdate/:id', authMiddleware.authCheck, dateController.updateDate)
routes.delete('/admin/showdate/:id', authMiddleware.authCheck, dateController.deleteDate)

module.exports = routes
