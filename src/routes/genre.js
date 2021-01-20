const routes = require('express').Router()
const genreController = require('../controllers/genre')

// Admin
routes.get('/', genreController.listGenre)
routes.get('/:id', genreController.detailGenre)
routes.post('/', genreController.createGenre)
routes.put('/', genreController.updateGenre)
routes.patch('/:id', genreController.updateGenre)
routes.delete('/:id', genreController.deleteGenre)

module.exports = routes
