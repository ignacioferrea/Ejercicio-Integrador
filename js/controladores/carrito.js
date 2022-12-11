class CarritoController extends CarritoModel {
    
    constructor() {
        super()

        try {
            this.carrito = JSON.parse(localStorage.getItem('carrito')) || []

        } catch (error) {
            console.error('Algo ocurrió con la lectura del localStorage', error)
            this.carrito = []
            localStorage.setItem('carrito', this.carrito)
        }    
    }

    elProductoEstaEnElCarrito() {
    
    }

    obtenerProductoDeCarrito() {

    }

    agregarAlCarrito() {

    }

    borrarProductoCarrito() {

    }

    enviarCarrito() {

    }

    
}

const carritoController = new CarritoController()