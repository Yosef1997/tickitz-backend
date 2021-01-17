const routes = require('express').Router()
const genreController = require('../controllers/genre')
const moviesController = require('../controllers/movies')

routes.get('/', genreController.listGenre)
routes.get('/:name', moviesController.genreMovies)

module.exports = routes
