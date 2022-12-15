const mongoose = require('mongoose')

/* Esquema del documento producto */

const productoSchema = mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    marca: String,
    categoria: String,
    detalles: String,
    foto: String,
    envio: Boolean
})

/* Modelo del documento almacenado en una colección */
const ProductoModel = mongoose.model('productos', productoSchema)

/* ---------------------------------------------------------- */

class ProductoModelMongoDB {

    async conectarDB() {
        try {
          await mongoose.connect(process.env.URI_MONGODB_LOCAL)
          console.log('Base de datos conectada')

        } catch (error) {
            console.log(`MongoDB error al conectar ${error}`)
        }
    }

    /* CRUD -> C: Create -> http method POST */
    async createProducto(producto) {
        try {
            const productoSave = new ProductoModel(producto)
            await productoSave.save()

            return productoSave

        } catch (error) {
            console.log(`Error en el createProducto: ${error}`)
        }
    }

    /* CRUD -> R: Read All -> http method GET */
    async readProductos() {
        try {
            const productos = await ProductoModel.find({})
            return productos 
        } catch (error) {
            console.log(error)
        }
    }

    /* CRUD -> R: Read One -> http method GET */
    async readProducto(id) {
        try {
            const producto = await ProductoModel.findById(id)
          return producto 
        } catch (error) {
            console.log(error)
        }
    }

    /* CRUD -> U: Update -> http method PUT */
    async updateProducto(id, producto) {
        try {
            const resultado = await ProductoModel.updateOne({_id: id}, {$set: producto})

            const productoActualizado = await ProductoModel.findById(id)
            
            return {resultado, productoActualizado}

        } catch (error) {
            console.log(`Error en updateProducto: ${error}`)
        }
    }

    /* CRUD -> D: Delete -> http method DELETE */
    async deleteProducto(id) {
        try {
            const productoBorrado = await ProductoModel.findByIdAndDelete(id)
            return productoBorrado
        } catch (error) {
            console.log(`Error en deleteProducto: ${error}`)
        }
    }
}

module.exports = ProductoModelMongoDB