const routes = require('express').Router()
const moviesController = require('../controllers/movies')

// User
routes.get('/', moviesController.listMovies)
routes.get('/:id', moviesController.detailMovies)

// Admin
routes.get('/', moviesController.listMovies)
routes.get('/:id', moviesController.detailMovies)
routes.post('/', moviesController.post)
routes.put('/', moviesController.put)
routes.patch('/:id', moviesController.patch)
routes.delete('/:id', moviesController.delete)

module.exports = routes
