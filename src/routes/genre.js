const routes = require('express').Router()
const genreController = require('../controllers/genre')
// user
routes.get('/', genreController.listGenre)
routes.get('/genre/:name', genreController.detailGenre)

// Admin
routes.get('/', genreController.listGenre)
routes.get('/:id', genreController.Genre)
routes.post('/', genreController.post)
routes.put('/', genreController.put)
routes.patch('/:id', genreController.patch)
routes.delete('/:id', genreController.delete)

module.exports = routes
