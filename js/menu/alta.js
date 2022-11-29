class FormularioAlta {
    inputs = null 
    form = null 
    button = null 
    camposValidos = [false, false, false, false, false, false, false, false] 
    
    // Todas las expresiones regulares de los campos
    regExpValidar = [
        /^.+$/, // nombre
        /^.+$/, // precio
        /^[0-9]+$/, // stock
        /^.+$/, // marca
        /^.+$/, // categoria
        /^.+$/, // detalles
        /^.+$/ // foto
    ]

    constructor(renderTablaAlta, guardarProducto) {
        this.inputs = document.querySelectorAll('main form input') 
        this.form = document.querySelector('main form')
        this.button = document.querySelector('main form button')

        this.button.disabled = true
        
        this.inputs.forEach((input, index) => {
            if(input.type != 'checkbox') {
                input.addEventListener('input', () => {
                    this.validar(input.value, this.regExpValidar[index], index)
                    if(renderTablaAlta) renderTablaAlta(!this.algunCampoValido(), productoController.productos)
                })
            }
        })

        this.form.addEventListener('submit', e => {
            e.preventDefault()
            
            const producto = this.leerProductoIngresado()
            this.limpiarFormulario()

            if(guardarProducto) guardarProducto(producto)
        })         
    }

    // Para comprobar la validez de los campos
    algunCampoValido() {
        let valido = 
            camposValidos[0] &&
            camposValidos[1] &&
            camposValidos[2] &&
            camposValidos[3] &&
            camposValidos[4] &&
            camposValidos[5] &&
            camposValidos[6] 
        return !valido
    }

    // Validar campos
    validar(valor, validador, index) {
        if(!validador.test(valor)) {
            this.setCustomValidityJS('Este campo no es válido', index)
            this.camposValidos[index] = false
            this.button.disabled = true
            return null // break
        }

        this.camposValidos[index] = true
        this.button.disabled = this.algunCampoValido() // Si todos los campos son validos, retorna false(habilita el boton), de lo contrario retorna true y sigue sin habilitarse

        this.setCustomValidityJS('', index)
        return valor
    }

    // Mostrar u ocultar mensaje de validez
    setCustomValidityJS(mensaje, index) {
        let divs = document.querySelectorAll('form div')
        divs[index].innerHTML = mensaje
        divs[index].style.display = mensaje ? 'block' : 'none'
    }

    // Producto ingresado en el formulario
    leerProductoIngresado() {
        return {
            nombre: this.inputs[0].value,
            precio: this.inputs[1].value,
            stock: this.inputs[2].value,
            marca: this.inputs[3].value,
            categoria: this.inputs[4].value,
            detalles: this.inputs[5].value,
            foto: this.inputs[6].value,
            envio: this.inputs[7].checked
        }
    }

    // Limpiamos los inputs del formulario
    limpiarFormulario() {
        // Borro todos los inputs
        this.inputs.forEach(input => {
            if(input.type != 'checkbox') input.value = ''
            else if (input.type == 'checkbox') input.cheked = false
        })

        this.button.disabled = true
        this.camposValidos = [false,false,false,false,false,false,false,false]
    }
}

// Rendereo plantilla
const renderTablaAlta = (validos, productos) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'plantillas/listado.hbs')
    xhr.addEventListener('load', () => {
        if(xhr.status === 200) {
            let plantillaHbs = xhr.response

            let template = Handlebars.compile(plantillaHbs)

            console.warn(productos)
            let html = template({productos, validos})
            document.getElementById('listado-productos').innerHTML = html
        }
    })

    xhr.send()
}

/* -------------------------------------------------- */
/* Inicializaciones para el funcionamiento del módulo */
/* -------------------------------------------------- */
let formularioAlta = null


async function initAlta () {
    console.warn('initAlta()')  

    formularioAlta = new FormularioAlta(renderTablaAlta, productoController.guardarProducto)

    const productos = await productoController.obtenerProductos()
    renderTablaAlta(null, productos)
}
