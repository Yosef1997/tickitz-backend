const routes = require('express').Router()
const moviesController = require('../controllers/movies')

// User
routes.get('/', moviesController.listMovies)
routes.get('/:id', moviesController.detailMovies)
routes.get('/genre/:name', moviesController.listMovieByGenre)

module.exports = routes
