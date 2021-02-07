const routes = require('express').Router()
const moviesController = require('../controllers/movies')
const authMiddleware = require('../middlewares/auth')

// User
routes.get('/movies/', moviesController.listMovies)
routes.get('/movies/:id', moviesController.detailMovies)
routes.get('/genre/:name', moviesController.listMovieByGenre)

// Admin
routes.get('/admin/movies/', authMiddleware.authCheck, moviesController.listMovies)
routes.get('/admin/movies/:id', authMiddleware.authCheck, moviesController.detailMovies)
routes.post('/admin/movies/', authMiddleware.authCheck, moviesController.createMoviesAsync)
routes.put('/admin/movies/', authMiddleware.authCheck, moviesController.createMoviesAsync)
routes.patch('/admin/movies/:id', authMiddleware.authCheck, moviesController.updateMovie)
routes.delete('/admin/movies/:id', authMiddleware.authCheck, moviesController.deleteMovie)

module.exports = routes
