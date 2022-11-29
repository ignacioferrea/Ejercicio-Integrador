class ProductoService {
    URL_PRODUCTOS = 'https://6372b00a348e947299fb5255.mockapi.io/productos/'

    async obtenerProductosService() {
        let productos = await get(this.URL_PRODUCTOS)
        return productos
    }
    
    async guardarProductoService(producto) {
        const productoGuardado = await post(this.URL_PRODUCTOS, producto)
        // console.log(productoGuardado)
        return productoGuardado
    }
    
    async actualizarProductoService(id, producto) {
        const productoActualizado = await put(this.URL_PRODUCTOS, id, producto)
        return productoActualizado
    }
    
    async borrarProductoService(id) {
        const productoBorrado = await del(this.URL_PRODUCTOS, id)
        // console.log(productoBorrado)
        return productoBorrado
    }
}



