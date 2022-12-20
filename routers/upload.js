const express = require('express')
const upload = require('../config/multer')
const routerUpload = express.Router()

const controller = require('../controller/upload')

/* POST - request para agregar un producto */
routerUpload.post('/', upload.single('foto'), controller.uploadImage)

module.exports = routerUpload