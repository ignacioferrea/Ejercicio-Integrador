const express = require('express')
const routerUpload = express.Router()

/* POST - Request para agregar producto */
routerUpload.post('/', (req, res) => {
    res.send('Recibiendo imagen')
})

module.exports = routerUpload