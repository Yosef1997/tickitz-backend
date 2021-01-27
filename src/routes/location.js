const routes = require('express').Router()
const locationController = require('../controllers/location')

// user
routes.get('/location', locationController.listLocation)
routes.get('/location/:id', locationController.detailLocation)

// Admin
routes.get('/admin/location', locationController.listLocation)
routes.get('/admin/location/:id', locationController.detailLocation)
routes.post('/admin/location', locationController.creatLocation)
routes.put('/admin/location', locationController.updateLocation)
routes.patch('/admin/location/:id', locationController.updateLocation)
routes.delete('/admin/location/:id', locationController.deleteLocation)

module.exports = routes
