const routes = require('express').Router()
const moviesController = require('../controllers/movies')

// User
routes.get('/', moviesController.listMovies)
routes.get('/:id', moviesController.detailMovies)

// Admin
routes.get('/', moviesController.listMovies)
routes.get('/:id', moviesController.detailMovies)
routes.post('/', moviesController.createMovies)
routes.put('/', moviesController.createMovies)
routes.patch('/:id', moviesController.updateMovie)
routes.delete('/:id', moviesController.deleteMovie)

module.exports = routes
