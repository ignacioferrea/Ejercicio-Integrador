const URL_PRODUCTOS = 'https://6372b00a348e947299fb5255.mockapi.io/productos'

async function obtenerProductosService() {
    let productos = await get(URL_PRODUCTOS)
    console.log(productos)
    return productos
}