const routes = require('express').Router()
const cinemasController = require('../controllers/cinemas')
const authMiddleware = require('../middlewares/auth')

// User
routes.get('/cinemas', cinemasController.listCinemas)
routes.get('/cinemas/:id', cinemasController.detailCinema)

// Admin
routes.get('/', authMiddleware.authCheck, cinemasController.listCinemas)
routes.get('/:id', authMiddleware.authCheck, cinemasController.detailCinema)
routes.put('/', authMiddleware.authCheck, cinemasController.createCinemas)
routes.post('/', authMiddleware.authCheck, cinemasController.createCinemas)
routes.patch('/:id', authMiddleware.authCheck, cinemasController.updateCinemas)
routes.delete('/:id', authMiddleware.authCheck, cinemasController.deleteCinema)

module.exports = routes
