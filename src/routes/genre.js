const routes = require('express').Router()
const genreController = require('../controllers/genre')

routes.get('/', genreController.genreMovies)
routes.get('/:name', genreController.genreMovies)

module.exports = routes
