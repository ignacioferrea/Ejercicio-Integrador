let mostrarCarrito = false

async function renderTablaCarrito(carrito) {

    try { 
        const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
        const respuesta = await fetch('plantillas/carrito.hbs')
        const plantillaHbs = await respuesta.text()
        const template = Handlebars.compile(plantillaHbs)
        const html = template({ carrito })

        elemSectionCarrito.innerHTML = html
        elemSectionCarrito.classList.add('section-carrito--visible')
        carritoController.precioFinal()

    } catch (error) {
        console.error(error)
    }
}


function initCarrito() {
    console.warn('initCarrito()')

    const btnCarrito = document.getElementsByClassName('search-bar__carrito-container')[0]

    btnCarrito.addEventListener('click', async () => {
        mostrarCarrito = !mostrarCarrito

        try {
            await renderTablaCarrito(carritoController.carrito)

        } catch (error) {
            console.error(error)
        }
        
    })

    carritoController.cuentaProds()
}

initCarrito()