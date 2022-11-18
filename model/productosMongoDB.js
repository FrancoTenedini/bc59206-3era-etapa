const mongoose = require('mongoose')

/*  Esquema del documento producto  */

const productoSchema = mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    marca: String,
    categoria: String,
    detalles: String,
    foto: String,
    envio: Boolean
})

/* Modelo del documento almacenado en una collection */
const ProductoModel = mongoose.model('productos', productoSchema)

/* -------------------------------------------------------------- */

class ProductoModelMongoDB { 

    async conectarDB(){
        try{
            //await mongoose.connect(process.env.URL_MONGODB_LOCAL) NO LO TOMA NO SE XQ
            await mongoose.connect("mongodb://localhost:27017/bcecommerce")
            console.log('Base de datos conectadas')
        } catch (error) {
            console.log(`Error al intentar conectarse con la BD ${error}`)
        }
    }

    /* CRUD */
    /* CREATE  http method post */
    async createProducto(producto){
        try {
            const productoSave = new ProductoModel(producto) //creo la collection y la guardo en productoSave
            await productoSave.save()

            return productoSave
        } catch (error) {
           console.log(`error en el create ${error}`) 
        }
    }

    /* READ ALL  http method get*/
    async readProductos(){
        
        const productos = await ProductoModel.find({})
        return productos
    }

    /* READ  http method get*/
    async readProducto(id){
        
        const producto = await ProductoModel.findById(id)
        return producto
    }

    /* UPDATE http method put */
    async updateProducto(id, producto){
        
        try {
            const resultado = await ProductoModel.updateOne({_id: id}, {$set: producto})
            console.log(resultado)

            const productoActualizado = await ProductoModel.findById(id)

            return {resultado, productoActualizado}
        } catch (error) {
            console.log(`Error en el update: ${error}`)
        }

    }

    /* DELETE http method delete */
    async deleteProducto(id){
        try {
            await ProductoModel.findByIdAndDelete(id)
            return 'Ok deleteProducto'
        } catch (error) {
            console.log(`Error en deleteProducto: ${error}`)
        }
    }
}

module.exports = ProductoModelMongoDB
