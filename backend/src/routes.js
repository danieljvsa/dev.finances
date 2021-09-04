
const express = require('express')
const routes = express.Router()
const SystemController = require('./controllers/SystemController')
const PaymentController = require('./controllers/PaymentController')
const authMiddleware = require('./middlewares/auth')



routes.get('/', SystemController.index)
routes.post('/create', SystemController.create)
routes.post('/authenticate', SystemController.authenticate)
routes.post('/forgot-password', SystemController.forgot_password)
routes.post('/reset-password', SystemController.reset_password)

routes.get('/payments', authMiddleware, PaymentController.index)
routes.post('/create-payment', authMiddleware, PaymentController.create)
routes.delete('/payments/:id', authMiddleware, PaymentController.delete)
routes.get('/sum-earnings',  authMiddleware, PaymentController.sum_earnings)
routes.get('/sum-total',  authMiddleware, PaymentController.sum_total)


module.exports = routes;