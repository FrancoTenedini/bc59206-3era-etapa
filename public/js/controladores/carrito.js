
class CarritoController extends CarritoModel {


    constructor() {
        super()
        
        try {
    
            this.carrito = JSON.parse(localStorage.getItem('carrito')) || []
            
        } catch (error) {

            console.error('Algo ocurrió con la lectura del localStorage', error)
            this.carrito = []
            localStorage.setItem('carrito', this.carrito)
            
        }

    }

    elProductoEstaEnElCarrito(producto) {
        //console.log(this.carrito.filter(prod => prod.id == producto.id).length)
        return this.carrito.filter(prod => prod.id == producto.id).length
    }

    obtenerProductoDeCarrito(producto) {
        return this.carrito.find(prod => prod.id == producto.id)
    }

    
    agregarAlCarrito(producto) {
        console.log(producto)
        if(!this.elProductoEstaEnElCarrito(producto)) {
            console.log('Quiere decir que existe en el carrito el producto')
            producto.cantidad = 1
            this.carrito.push(producto)
        } else {
            console.log('Si no está el producto en el carrito')
            const productoDeCarrito = this.obtenerProductoDeCarrito(producto)
            productoDeCarrito.cantidad++
        }

        localStorage.setItem('carrito', JSON.stringify(this.carrito))

    }


    async borrarProductoCarrito(id) {
        
        try {
            const index = this.carrito.findIndex(prod => prod.id == id)
            this.carrito.splice(index, 1)
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
            await renderTablaCarrito(this.carrito)
        } catch (error) {
            console.log(error)
        }
    }

    async enviarCarrito() {
        
        try {
            const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
            const header = document.getElementsByClassName('main-header')
            header[0].style.display = 'none'

            elemSectionCarrito.innerHTML = '<h2>Enviando carrito...</h2>'
            const preferences = await carritoService.guardarCarritoService(this.carrito)
            this.carrito = []
            localStorage.setItem('carrito', JSON.stringify(this.carrito))

            elemSectionCarrito.innerHTML = '<h2>Enviando carrito <b>OK!</b></h2>'

            setTimeout( async () => {
                elemSectionCarrito.classList.remove('section-carrito--visible')
                mostrarCarrito = false
                console.log(preferences)
                await renderPago(preferences)
            }, 0);

            

        } catch (error) {
            console.error(error)
        }

    }

 
    
}

const carritoController = new CarritoController()