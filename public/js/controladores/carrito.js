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

    cerrarCarrito() {
        const carrito = document.getElementsByClassName('section-carrito')[0]
        carrito.classList.remove('section-carrito--visible')
    }

    cantProductos() {
        let totalProds = 0
        this.carrito.forEach(prod => {
            totalProds += prod.cantidad
        })
        return totalProds
    }

    cuentaProds() {
        let contador = document.getElementById('contador') 

        if(this.cantProductos()) {
            contador.style.display = 'block'
            contador.innerHTML = this.cantProductos()
        }
        else {
            contador.style.display = 'none'
        }
    }

    precioFinal() {
        let total = 0
        const containerPrecio = document.getElementById('precioFinal')
        
        this.carrito.forEach(prod => {
            total += prod.precio * prod.cantidad
        })

        if (this.cantProductos()) {
            containerPrecio.innerHTML = `Total: $${total}`
        }
    }

    elProductoEstaEnElCarrito(producto) {
        return this.carrito.filter(prod => prod.id == producto.id).length
    }

    obtenerProductoDeCarrito(producto) {
        return this.carrito.find(prod => prod.id == producto.id)
    }

    agregarAlCarrito(producto) {

        if(!this.elProductoEstaEnElCarrito(producto)) {
            producto.cantidad = 1
            this.carrito.push(producto)
            this.cuentaProds()
        }
        else {
            const productoDeCarrito = this.obtenerProductoDeCarrito(producto)
            productoDeCarrito.cantidad++
            this.cuentaProds()
        }
        
        localStorage.setItem('carrito', JSON.stringify(this.carrito))
    }

    async borrarProductoCarrito(id) {
        try {
            const index = this.carrito.findIndex(prod => prod.id == id)
            this.carrito.splice(index, 1)
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
            this.cuentaProds()
            this.precioFinal()
    
            await renderTablaCarrito(this.carrito)
        } catch (error) {
            console.log(error)
        }
    }

    async enviarCarrito() {
        try {
            const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
        
            elemSectionCarrito.innerHTML = '<h2>Enviando carrito...</h2>'
            const preference = await carritoService.guardarCarritoServicio(this.carrito)
            this.carrito = []
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
            this.cuentaProds()

            elemSectionCarrito.innerHTML = '<h2>Enviando carrito <b>OK!</b></h2>'

            setTimeout( async () => {
                elemSectionCarrito.classList.remove('section-carrito--visible')
                await renderPago(preference)
            }, 0)
        } catch (error) {
            console.error(error)
        }
    }
}

const carritoController = new CarritoController()