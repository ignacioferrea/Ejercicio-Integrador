const express = require('express')
const routerCarrito = express.Router()
const controller = require('../controller/carrito')

/* POST - Request para agregar producto al carrito */
routerCarrito.post('/', controller.guardarCarrito)

module.exports = routerCarrito