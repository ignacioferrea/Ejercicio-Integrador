let productos = []

async function obtenerProductos() {
    productos = await obtenerProductosService()
    renderProds()
}

async function guardarProducto() {
    const producto = leerProductoIngresado()
    limpiarFormulario()

    const productoGuardado = await guardarProductoService(producto)
    console.log(productoGuardado)

    productos.push(productoGuardado)

    renderProds()
}

async function actualizarProducto(id) {
    console.log('actualizarProducto', id)

    const producto = leerProductoIngresado()
    limpiarFormulario()

    const productoActualizado = await actualizarProductoService(id, producto)
    console.log(productoActualizado)

    const index = productos.findIndex(producto => producto.id == productoActualizado.id)
    productos.splice(index, 1, productoActualizado)

    renderProds()
}

async function borrarProducto(id) {
    console.log('borrarProducto', id)

    let productoBorrado = await borrarProductoService(id)

    const index = productos.findIndex(producto => producto.id == productoBorrado.id)
    productos.splice(index, 1)

    renderProds()
}