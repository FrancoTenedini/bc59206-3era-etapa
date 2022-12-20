const express = require('express')

const routerCarrito = require('./routers/carrito')
const routerProductos = require('./routers/productos')
const routerUpload = require('./routers/upload')

//Configuraciones 
const app = express()
require('dotenv').config()

//Middleware  ic('public'))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Routeo de mi aplicacion
app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)
app.use('/api/upload', routerUpload)

const PORT = 8081
app.listen(PORT, (err) => {
    if(err) throw new Error (`Sucedio un error ${err}`)
        
    console.log(`Servidor arriba, escuchando en el puerto: ${PORT}`)
})