const routes = require('express').Router()
const transactionController = require('../controllers/transaction')

routes.get('/transaction', transactionController.listTransaction)
routes.get('/transaction/:id', transactionController.detailTransaction)
routes.post('/transaction', transactionController.createTransaction)

module.exports = routes
