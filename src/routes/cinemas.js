const routes = require('express').Router()
const cinemasController = require('../controllers/cinemas')

// User
routes.get('/', cinemasController.listCinemas)
routes.get('/:id', cinemasController.detailCinemas)

// Admin

module.exports = routes
