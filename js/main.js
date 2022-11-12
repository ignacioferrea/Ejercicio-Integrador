var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

function start() {
    
    /* ----------------- */
    /* Funciones helpers */
    /* ----------------- */

    // AJAX
    function ajax(url, metodo = 'get') {
        const xhr = new XMLHttpRequest()
        xhr.open(metodo, url)
        xhr.send()

        return xhr
    }

    function getNombreArchivo(id) { // id => alta
        return 'vistas/' + id + '.html' // Concatena para armar la ruta del archivo, por ejemplo: 'vistas/alta.html 
    }

    function initJS(id) {
        if (id === 'alta') {
            initAlta()
        }
        else if (id === 'inicio') {
            initInicio()
        }
        else if (id === 'nosotros') {
            initNosotros()
        }
        else if (id === 'contacto') {
            initContacto()
        }
    }

    function cargarPlantilla(id) {
        let archivo = getNombreArchivo(id)

        let xhr = ajax(archivo)
        xhr.addEventListener('load', () => {
            if(xhr.status === 200) {
                let plantilla = xhr.response

                // Carga del código de la vista (HTML) de la plantilla
                let main = document.querySelector('main')
                main.innerHTML = plantilla

                // Carga del codigo script (JS) de la plantilla
                initJS(id)
            }
        })
    }
}

start()