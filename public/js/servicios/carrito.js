class CarritoService {
    URL_CARRITO = '/api/carrito/'
    //URL_CARRITO = 'https://633ccbd77e19b17829025cf3.mockapi.io/carrito/'

    async guardarCarritoService(carrito) {
        const carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado
    }

}

const carritoService = new CarritoService()