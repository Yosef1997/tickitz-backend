const routes = require('express').Router()
const authController = require('../controllers/auth')

routes.post('/login', authController.login)
routes.post('/register', authController.register)
routes.patch('/profile/:id', authController.updateUser)
module.exports = routes
