const CarritoModel = require("../model/carrito");

const model = CarritoModel.get('MONGODB') // FILE | MONGODB

const guardarCarrito = async carrito => {
    const carritoGuardado = await model.createCarrito(carrito)
    return carritoGuardado
}

module.exports = {
    guardarCarrito
}