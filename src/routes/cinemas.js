const routes = require('express').Router()
const cinemasController = require('../controllers/cinemas')

// User
routes.get('/cinemas', cinemasController.listCinemas)
routes.get('/cinemas/:id', cinemasController.detailCinema)

// Admin
routes.get('/', cinemasController.listCinemas)
routes.get('/:id', cinemasController.detailCinema)
routes.put('/', cinemasController.createCinema)
routes.post('/', cinemasController.createCinema)
routes.patch('/:id', cinemasController.updateCinema)
routes.delete('/:id', cinemasController.deleteCinema)
module.exports = routes
