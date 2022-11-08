const productos = []
const camposValidos = [false,false,false,false,false,false,false,false]

const inputs = document.querySelectorAll('input')
const form = document.querySelector('form')
const button = document.querySelector('button')

button.disabled = true

console.log(inputs, form, button)

// Muestro u oculto mensaje de validez
const setCustomValidityJS = (mensaje, index) => {
    let divs = document.querySelectorAll('form div')
    divs[index].innerHTML = mensaje
    divs[index].style.display = mensaje ? 'block' : 'none'
}

// Para comprobar la validez de los campos
const algunCampoValido = () => {
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
const validar = (valor, validador, index) => {
    if(!validador.test(valor)) {
        setCustomValidityJS('Este campo no es válido', index)
        camposValidos[index] = false
        button.disabled = true
        return null // break
    }

    camposValidos[index] = true
    button.disabled = algunCampoValido() // Si todos los campos son validos, retorna false(habilita el boton), de lo contrario retorna true y sigue sin habilitarse

    setCustomValidityJS('', index)
    return valor
}

// Todas las expresiones regulares de los campos
const regExpValidar = [
    /^.+$/, // nombre
    /^.+$/, // precio
    /^[0-9]+$/, // stock
    /^.+$/, // marca
    /^.+$/, // categoria
    /^.+$/, // detalles
    /^.+$/ // foto
]

inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        validar(input.value, regExpValidar[index], index)
    })
})

form.addEventListener('submit', e => {
    e.preventDefault()

    const producto = {
        nombre: inputs[0].value,
        precio: inputs[1].value,
        stock: inputs[2].value,
        marca: inputs[3].value,
        categoria: inputs[4].value,
        detalles: inputs[5].value,
        foto: inputs[6].value,
        envio: inputs[7].checked
    }

    // borrar inputs
    inputs.forEach(input => input.value = '');

    // console.log(producto)
    productos.push(producto) 

    button.disabled = true
    console.log(productos)
})

// Dibuja los productos 
const renderProdsObjetos = () => {

}

// Me permite dibujar cada una de las nuevas filas de la tabla
const renderProdTemplateString = () => {

}