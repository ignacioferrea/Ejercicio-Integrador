const express = require('express')

// Configuraciones
const app = express()
require('dotenv').config()

// Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Routeo de mi aplicación
app.use('/api/productos', require('./routers/productos'))
app.use('/api/carrito', require('./routers/carrito'))
app.use('/api/upload', require('./routers/upload'))

const PORT = process.env.PORT
app.listen(PORT, (err) => {
    if ( err ) throw new Error(`Sucedio un error ${err}`)

    console.log(`Servidor arriba, escuchando en el puerto: ${PORT}`)
})