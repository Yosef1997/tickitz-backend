const routes = require('express').Router()
const moviesController = require('../controllers/movies')

// User
routes.get('/usermovies', moviesController.listMovies)
routes.get('/usermovies/:id', moviesController.detailMovies)
routes.get('/genre/:name', moviesController.listMovieByGenre)

module.exports = routes
