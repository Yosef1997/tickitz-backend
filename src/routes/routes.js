const routes = require('express').Router()
const tesController = require('../controllers/movies')

routes.post('/', tesController.createMoviesAsync)

module.exports = routes
