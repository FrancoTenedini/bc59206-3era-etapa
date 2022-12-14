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

    pk = '_id'

    async conectarDB() {

        try {
            await mongoose.connect(process.env.URI_MONGODB_REMOTA)
            console.log('Base de datos conectada!')
        } catch (error) {
            console.log(`MongoDB error al conectar ${error}`)
        }
    }  

    genIdKey(obj) {

        if(Array.isArray(obj)) {
            for(let i=0; i<obj.length; i++) {
                obj[i].id = obj[i][this.pk]
            }
        }
        else {
            obj.id = obj[this.pk]
        }

        return obj
    }


    /* CRUD -> C: Create -> http method POST */
    async createProducto(producto) {

        try {
            
            const productoSave = new ProductoModel(producto)
            await productoSave.save()

            const productos = await ProductoModel.find({}).lean()
            const productoGuardado = productos[productos.length-1]
            return this.genIdKey(productoGuardado)

            return productoSave
            
        } catch (error) {
            console.log(`Error en el createProducto: ${error}`)
        }
    }

    /* CRUD -> R: Read ALL -> http method GET */
    async readProductos() {
        try {
            const productos = await ProductoModel.find({}).lean() // lean convierte obj mongoose en un obj vanilla js
            return this.genIdKey(productos)
        } catch (error) {
            console.log(`Error en readProductos: ${error}`)
            return []
        }
        
    }

    /* CRUD -> R: Read ONE -> http method GET */
    async readProducto(id) {

        try {
            const producto = await ProductoModel.findById(id).lean()
            return this.genIdKey(producto)
        } catch (error) {
            console.log(`Error en readProducto: ${error}`)
            return {}
        }
        
    }

    /* CRUD -> U: UPDATE -> http method PUT */
    async updateProducto(id, producto) {

        try {
            
            const resultado = await ProductoModel.updateOne({_id: id},{$set: producto})
            console.log(resultado)

            const productoActualizado = await ProductoModel.findById(id).lean()

            return this.genIdKey(productoActualizado)
        } catch (error) {
            console.log(`Error en updateProducto: ${error}`)
            return {}
        }
        
    }

    /* CRUD -> D: DELETE -> http method DELETE */
    async deleteProducto(id) {
        
        try {
            //await ProductoModel.deleteOne({_id: id})    
            const productoBorrado = await ProductoModel.findByIdAndDelete(id)
            return this.genIdKey(productoBorrado)

        } catch (error) {
            console.log(`Error en deleteProducto: ${error}`)
            return {}
        }   
    }
}

module.exports = ProductoModelMongoDB
