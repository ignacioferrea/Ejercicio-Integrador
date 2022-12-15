class FormularioAlta {
    inputs = null 
    form = null 
    button = null 
    camposValidos = [false, false, false, false, false, false] 
    
    // Todas las expresiones regulares de los campos
    regExpValidar = [
        /^.+$/, // nombre
        /^.+$/, // precio
        /^[0-9]+$/, // stock
        /^.+$/, // marca
        /^.+$/, // categoria
        /^.+$/, // detalles
    ]

    /* ##### Drag & Drop ##### */
    imagenSubida = ''
    dropArea = null
    progressBar = null
    /* ##### Drag & Drop ##### */

    constructor(renderTablaAlta, guardarProducto) {
        // console.log(renderTablaAlta, guardarProducto) // Referencias de las funciones
        this.inputs = document.querySelectorAll('main form input.data-validation') 
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

        /* ##### Drag & Drop ##### */
        this.dropArea = document.getElementById('drop-area')
        this.progressBar = document.getElementById('progress-bar')

        // Cancelo el evento automatico del drag&drop
        ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.dropArea.addEventListener(eventName, e => e.preventDefault())
            document.body.addEventListener(eventName, e => e.preventDefault())
        })

        // Remarco la zona de drop al arrastrar la imagen dentro
        ;['dragenter', 'dragover'].forEach(eventName => {
            this.dropArea.addEventListener(eventName, () => {
                this.dropArea.classList.add('highlight')
            })
        })

        ;['dragleave', 'drop'].forEach(eventName => {
            this.dropArea.addEventListener(eventName, () => {
                this.dropArea.classList.remove('highlight')
            })
        })

        this.dropArea.addEventListener('drop', e => {
            const dataTransf = e.dataTransfer
            const files = dataTransf.files

            this.handleFiles(files)
        })
        /* ##### Drag & Drop ##### */

        const inputFoto = document.querySelector('#foto')

        inputFoto.addEventListener('change', () => {
          console.log('Cambió el input')

          const files = inputFoto.files

          this.handleFiles(files)
        })
    }


    // Para comprobar la validez de los campos
    algunCampoValido() {
        let valido = 
            this.camposValidos[0] &&
            this.camposValidos[1] &&
            this.camposValidos[2] &&
            this.camposValidos[3] &&
            this.camposValidos[4] &&
            this.camposValidos[5] 
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
        let divs = document.querySelectorAll('form .mensaje-validacion')
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
            foto: this.imagenSubida ? `/uploads/${this.imagenSubida}` : '',
            envio: this.inputs[6].checked
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
        this.camposValidos = [false, false, false, false, false, false]
        
        const img = document.querySelector('#gallery img')
        img.src = ''

        this.initializeProgress()
        this.imagenSubida = ''
    }

    /* #### Drag & Drop #### */
    initializeProgress() {
        this.progressBar.value = 0
    }

    updateProgress(porcentaje) {
        this.progressBar.value = porcentaje
    }

    previewFile(file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function() {
            const img = document.querySelector('#gallery img')
            img.src = reader.result
        }
    }

    handleFiles = files => {
        const file = files[0]
        this.initializeProgress()
        this.uploadFile(file)
        this.previewFile(file)
    }

    uploadFile = file => {
        const url = '/api/upload'

        const xhr = new XMLHttpRequest()
        const formData = new FormData()

        xhr.open('POST', url)

        xhr.upload.addEventListener('progress', e => {
            let porcentaje = (((e.loaded * 100.0) / e.total) || 100)
            this.updateProgress(porcentaje)
        })

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const objImagen = JSON.parse(xhr.response) 
                this.imagenSubida = objImagen.nombre // {nombre: imageName.jpg}
            }
        })

        formData.append('foto', file)
        xhr.send(formData)
    }

    /* #### Drag & Drop #### */
}

// Rendereo plantilla
const renderTablaAlta = (validos, productos) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'plantillas/alta.hbs')
    xhr.addEventListener('load', () => {
        if(xhr.status === 200) {
            let plantillaHbs = xhr.response

            let template = Handlebars.compile(plantillaHbs)

            // console.warn(productos)
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

