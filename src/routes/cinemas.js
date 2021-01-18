const routes = require('express').Router()
const cinemasController = require('../controllers/cinemas')

// User
routes.get('/', cinemasController.listCinemas)
routes.get('/:id', cinemasController.detailCinemas)

// Admin
routes.get('/', cinemasController.listCinemas)
routes.get('/:id', cinemasController.detailCinemas)
routes.put('/', cinemasController.put)
routes.post('/', cinemasController.post)
routes.patch('/:id', cinemasController.patch)
routes.delete('/:id', cinemasController.delete)
module.exports = routes
