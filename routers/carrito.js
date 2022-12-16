const express = require('express')
const routerCarrito = express.Router()

const controller = require('../controller/carrito')
const { feedBack } = require('../controller/pago')

/* POST - Request para agregar producto al carrito */
routerCarrito.post('/', controller.guardarCarrito)

routerCarrito.get('/feedback', feedBack)

module.exports = routerCarrito