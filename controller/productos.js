const service = require('../service/productos')

const obtenerProductos = async (req, res) => {
    let id = req.params.id 

    if(id) {
        const producto = await service.obtenerProducto(id)
        return res.status(200).json(producto)
    }
    else {
        const producto = await service.obtenerProductos()
        return res.status(200).json(producto)
    }
    
}

const guardarProducto = async (req, res) => {
    const producto = req.body
    const productoGuardado = await service.guardarProducto(producto)
    res.status(201).json(productoGuardado)
}

const actualizarProducto = (req, res) => {
    res.send('Soy un controlador re piola')
}

const borrarProductos = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json(
            {
                borrado: false,
                msg: 'No envió el ID'
            }
        )
    }
    
    const productoBorrado = await service.borrarProducto(id)
    res.status(200).json(
        {
            borrado: true,
            msg: 'Borrado correctamente!',
            productoBorrado
        }
    )
}

module.exports = {
    obtenerProductos,
    guardarProducto,
    actualizarProducto,
    borrarProductos
}