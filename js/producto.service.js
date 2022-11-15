const URL_PRODUCTOS = 'https://6372b00a348e947299fb5255.mockapi.io/productos/'

async function obtenerProductosService() {
    let productos = await get(URL_PRODUCTOS)
    return productos
}

async function guardarProductoService(producto) {
    const productoGuardado = await post(URL_PRODUCTOS, producto)
    // console.log(productoGuardado)
    return productoGuardado
}

async function actualizarProductoService(id, producto) {
    const productoActualizado = await put(URL_PRODUCTOS, id, producto)
    return productoActualizado
}

async function borrarProductoService(id) {
    const productoBorrado = await del(URL_PRODUCTOS, id)
    // console.log(productoBorrado)
    return productoBorrado
}

/* ---- */
/* TEST */
/* ---- */
/* const producto = {
    nombre: 'Heladera' ,
    descripcion: 'Philco 3200',
    precio: 75000,
    stock: 4
}
console.log(producto) */

/* const campoEditado = {
    ...producto, // Spread operator
    precio: 80000
}
console.log(campoEditado) */

// guardarProductoService(producto)

// actualizarProductoService(4, producto)

// borrarProductoService(6)

