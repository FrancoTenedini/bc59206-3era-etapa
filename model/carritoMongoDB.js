const mongoose = require('mongoose')

/* Esquema del documento carrito */

const carritoSchema = mongoose.Schema({
    carrito: Array
})

/* Modelo del documento almacenado en una coleccion */

const CarritoModel = mongoose.model('carritos', carritoSchema)

/* creamos la clase con el crud */

class CarritoModelMongoDB {
    

    // CRUD -> CREATE -> post
    async createCarrito(carrito){
        try {
            const carritoSave = new CarritoModel({ carrito: carrito })
            await carritoSave.save()
            return carrito 
        } catch (error) {
            console.log(`Error en createCarrito: ${error}`)
            return {}
        }
    }
}

module.exports = CarritoModelMongoDB