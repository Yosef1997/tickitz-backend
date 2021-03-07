const routes = require('express').Router()
const authController = require('../controllers/auth')

routes.post('/login', authController.login)
routes.post('/register', authController.register)
routes.get('/profile/:id', authController.detailUser)
routes.patch('/profile/:id', authController.updateUser)
// routes.get('/profile/:email', authController.detailUser)
module.exports = routes
