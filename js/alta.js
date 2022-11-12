function initAlta () {
    console.warn('initAlta()')

    const productos = [
        {nombre: 'Reloj', precio: '5000', stock: '15', marca: 'Rolex', categoria: 'Accesorios', envio: true, foto: 'https://cdn0.iconfinder.com/data/icons/devices-42/1600/Watch_2-64.png', detalles: 'Digital'},
        {nombre: 'Gorra', precio: '60', stock: '30', marca: 'Nike', categoria: 'Accesorios', envio: false, foto: 'https://cdn3.iconfinder.com/data/icons/xi4dox/png/nike.png', detalles: 'Negra'},
        {nombre: 'Anteojos', precio: '300', stock: '20', marca: 'Rayband', categoria: 'Accesorios', envio: true, foto: 'https://cdn0.iconfinder.com/data/icons/summer-26/512/Sunglass-64.png', detalles: 'Aviador'},
    ]
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
        
        // renderProdsObjetos()
        // renderProdTemplateString()
        renderProds()
    
    })
    
    // Dibuja los productos 
    const renderProdsObjetos = () => {
        let html = ''
        for (let i = 0; i < productos.length; i++ ){
            html += `<p>${JSON.stringify(productos[i])}</p>`
        }
        document.getElementById('listado-productos').innerHTML = html
    }
    
    // Me permite dibujar cada una de las nuevas filas de la tabla
    const renderProdTemplateString = () => {
        let html = ''
    
        html += '<table>'
        console.log(html)
    
        html += 
        `
            <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th>Detalles</th>
                <th>Foto</th>
                <th>Envío</th>
            </tr>  
        `
        for (let i = 0; i < productos.length; i++) {
            let producto = productos[i]
            html += 
            `
                <tr>
                    <th>${producto.nombre}</th>
                    <th>${producto.precio}</th>
                    <th>${producto.stock}</th>
                    <th>${producto.marca}</th>
                    <th>${producto.categoria}</th>
                    <th>${producto.detalles}</th>
                    <th>${producto.foto}</th>
                    <th>${producto.envio}</th>
                </tr>
            `
        }
    }
    
    const renderProds = () => {
    
        const xhr = new XMLHttpRequest()
        xhr.open('get', 'plantillas/listado.hbs')
        xhr.addEventListener('load', () => {
            if(xhr.status === 200) {
                let plantillaHbs = xhr.response
                console.log(plantillaHbs)
    
                let template = Handlebars.compile(plantillaHbs)
                console.log(template)
    
                let html = template({productos: productos})
                
                // console.log(html) // Le agregó a la plantilla los datos de productos
    
                document.getElementById('listado-productos').innerHTML = html
            }
        })
    
        xhr.send()
    }
    renderProds()    
}

// initAlta()

