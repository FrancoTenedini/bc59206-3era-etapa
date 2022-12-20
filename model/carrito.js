const CarritoModelMongoDB = require("./carritoMongoDB")

class CarritoModel{

    static get(tipo){
        switch(tipo){
            case 'MONGODB':
                console.log('****** PERSISTENCIA EN MONGODB (Carrito) **********')
                return new CarritoModelMongoDB()
         
            default: 
                console.log('****** PERSISTENCIA EN MONGODB (Carrito) **********')
                return new CarritoModelMongoDB() 
        }
    }

}


module.exports = CarritoModel
