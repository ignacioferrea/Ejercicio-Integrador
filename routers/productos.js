const express = require('express')
const routerProductos = express.Router()

const controlador = require('../controller/productos')

/* GET ALL/ONE (Read) - Request de todos los productos */
routerProductos.get('/:id?', controlador.obtenerProductos)

/* POST (Create) - Request para agregar un producto */
routerProductos.post('/', controlador.guardarProducto)

/* PUT (Update) - Request para actualizar un producto */
routerProductos.put('/:id', controlador.actualizarProducto)

/* DELETE (Delete) - Request para borrar un producto*/
routerProductos.delete('/:id', controlador.borrarProducto)

module.exports = routerProductos