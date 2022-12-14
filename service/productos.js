const ProductoModel = require("../model/productos");

const model = ProductoModel.get('MONGODB')

const obtenerProducto = async id => {
    let producto = await model.readProducto(id)
    return producto
}

const obtenerProductos = async () => {
    let productos = await model.readProductos()
    return productos
}

const guardarProducto = async (producto) => {
    const productoGuardado = await model.createProducto(producto)
    return productoGuardado
}

const actualizarProducto = async (id, producto) => {
    const productoActualizado = await model.updateProducto(id, producto)
    return productoActualizado
}

const borrarProducto = async (id) => {
    const productoEliminado = await model.deleteProducto(id)
    return productoEliminado
}

module.exports = {
    obtenerProducto,
    obtenerProductos,
    guardarProducto,
    actualizarProducto,
    borrarProducto
}
