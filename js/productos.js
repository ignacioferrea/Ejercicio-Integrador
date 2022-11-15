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