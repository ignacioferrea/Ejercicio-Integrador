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

    const cargarPlantillas = () => {
        /* --------------------------------------------------------- */
        /* Carga inicial de la vista determinada por la url visitada */
        /* --------------------------------------------------------- */
        let id = location.hash.slice(1) || 'inicio' // EJ: #inicio => slice(1) => inicio || Si no hay nada que cargue inicio por default
        cargarPlantilla(id)

        /* ------------------------------------------------------------- */
        /* Carga de cada uno de los contenidos según la navegación local */
        /* ------------------------------------------------------------- */
        const links = document.querySelectorAll('header nav a')
        console.log(links)

        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault()

                let id = link.id
                console.log(id)
                location.hash = id
            })
        })

        window.addEventListener('hashchange', () => {
            console.log('Cambió la url')

            let id = location.hash.slice(1) || 'inicio'
            cargarPlantilla(id)
        })

    }

    cargarPlantillas()
}

start()