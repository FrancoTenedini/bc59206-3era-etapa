const express = require('express')

//Configuraciones 
const app = express()
require('dotenv').config()

//Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Routeo de mi aplicacion
app.get('/', (req, res) =>{
    res.send('holaa')
})

const PORT = process.env.PORT
app.listen(PORT, (err) => {
    if(err) throw new Error (`Sucedio un error ${err}`)
    
    console.log(`Servidor arriba, escuchando en el puerto: ${PORT}`)
})