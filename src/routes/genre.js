const routes = require('express').Router()
const genreController = require('../controllers/genre')
// user
routes.get('/', genreController.listGenre)
routes.get('/genre/:name', genreController.moviesGenre)

// Admin
routes.get('/', genreController.listGenre)
routes.get('/:id', genreController.detailGenre)
routes.post('/', genreController.createGenre)
routes.put('/', genreController.updateGenre)
routes.patch('/:id', genreController.updateGenre)
routes.delete('/:id', genreController.deleteGenre)

module.exports = routes
