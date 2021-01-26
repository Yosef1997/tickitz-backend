const routes = require('express').Router()
const timeController = require('../controllers/showTime')
const authMiddleware = require('../middlewares/auth')

// User
routes.get('/showtime', timeController.listShowTime)
routes.get('/showtime/:id', timeController.detailShowTime)

// Admin
routes.get('/admin/showtime', timeController.listShowTime)
routes.get('/admin/showtime/:id', timeController.detailShowTime)
routes.post('/admin/showtime', authMiddleware.authCheck, timeController.creatShowtime)
routes.patch('/admin/showtime/:id', authMiddleware.authCheck, timeController.updateShowTime)
routes.delete('/admin/showtime/:id', authMiddleware.authCheck, timeController.deleteShowTime)

module.exports = routes
