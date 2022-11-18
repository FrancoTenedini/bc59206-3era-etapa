const fs = require('fs')

class ProductoModelFile {
    
    nombreArchivo = 'productos.json'

    async leerArchivoProductos(){
            try {
                let leido = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
                let productos = await JSON.parse(leido)
                return productos
            } catch (error) {
                console.log("error a la hora de leer archivo fs", error)
                let productos = []
                return productos
            }
    }

    async guardarArchivoProductos(productos){
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, '\t'))
    }

    getId(productos){
        return productos.lenght ? (productos[productos.lenght - 1].id + 1) : 1 
    }

    /* CRUD  */
    /* C: CREATE - method: post*/
    async createProducto(producto){
        let productos = await this.leerArchivoProductos() 
        
        producto.id = this.getId(productos)
        productos.push(producto)

        await this.guardarArchivoProductos(productos)
    }    

    /* R: READ - method: get*/
    
    async readProductos(){
        const productos = await this.leerArchivoProductos()

        return productos 
    }

    /* R: READ-ONE - method: get*/
    async readProducto(id){
        const productos = await this.leerArchivoProductos()
        
        const producto = productos.find(producto => producto.id == id) || {}
        return producto 
    }

    
    /* D: DELETE - method: delete*/
    async deleteProducto(id){
        const productos = await this.leerArchivoProductos()
        const index = productos.findIndex(producto => producto.id == id)
        const producto = productos.splice(index,1)[0]
        
        await this.guardarArchivoProductos(productos)
        return producto
    }
 
    /* U: UPDATE - method: put */
    async updateProducto(id, producto){
        const productos = await this.leerArchivoProductos()

        producto.id = id
        const index = productos.findIndex(producto => producto.id == id)
        productos.splice(index, 1, producto)

        await this.guardarArchivoProductos(productos)

        return producto
    }

}

module.exports = ProductoModelFile