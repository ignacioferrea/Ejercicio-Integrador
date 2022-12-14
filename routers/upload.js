const express = require('express')
const routerUpload = express.Router()

const upload = require('../config/multer')
const controller = require('../controller/upload')

/* POST - Request para agregar producto */
routerUpload.post('/', upload.single('foto'), controller.uploadImagen)

module.exports = routerUpload