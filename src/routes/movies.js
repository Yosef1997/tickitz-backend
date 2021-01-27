const routes = require('express').Router()
const moviesController = require('../controllers/movies')
const authMiddleware = require('../middlewares/auth')

// User
routes.get('/', moviesController.listMovies)
routes.get('/:id', moviesController.detailMovies)
routes.get('/genre/:name', moviesController.listMovieByGenre)

// Admin
routes.get('/', authMiddleware.authCheck, moviesController.listMovies)
routes.get('/:id', authMiddleware.authCheck, moviesController.detailMovies)
routes.post('/', authMiddleware.authCheck, moviesController.createMoviesAsync)
routes.put('/', authMiddleware.authCheck, moviesController.createMoviesAsync)
routes.patch('/:id', authMiddleware.authCheck, moviesController.updateMovie)
routes.delete('/:id', authMiddleware.authCheck, moviesController.deleteMovie)

module.exports = routes
