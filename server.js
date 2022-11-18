const express = require('express')
const routerProductos = require('./routers/productos')

//Configuraciones 
const app = express()
require('dotenv').config()

//Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Routeo de mi aplicacion
app.use('/api/productos', routerProductos)

const PORT = process.env.PORT
app.listen(PORT, (err) => {
    if(err) throw new Error (`Sucedio un error ${err}`)
        
    console.log(`Servidor arriba, escuchando en el puerto: ${PORT}`)
})