const routes = require('express').Router()
const seatsController = require('../controllers/seats')
const authMiddleware = require('../middlewares/auth')

// User
routes.get('/seats', seatsController.listSeats)
routes.get('/seats/:id', seatsController.detailSeats)

// Admin
routes.get('/admin/seats', seatsController.listSeats)
routes.get('/admin/seats/:id', seatsController.detailSeats)
routes.post('/admin/seats', authMiddleware.authCheck, seatsController.creatSeats)
routes.patch('/admin/seats/:id', authMiddleware.authCheck, seatsController.updateSeat)
routes.delete('/admin/seats/:id', authMiddleware.authCheck, seatsController.deleteSeat)

module.exports = routes
