

async function renderTablaCarrito(carrito) {
    console.log(carrito)
    /*     console.log(total) */
    try {
        
        const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
        const respuesta = await fetch('plantillas/carrito.hbs')
        const plantillaHbs = await respuesta.text()
        const template = Handlebars.compile(plantillaHbs)
        const html = template({ carrito } )
        
        elemSectionCarrito.innerHTML = html
        elemSectionCarrito.classList.add('section-carrito--visible')        
        
              
        
    } catch (error) {
        console.error(error)
    }
    
}

let mostrarCarrito = false
const btnCarrito = document.getElementsByClassName('search-bar__carrito-container')[0]
const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]


function initCarrito() {
    console.warn('initCarrito()')
    
    btnCarrito.addEventListener('click', async () => {
       
        mostrarCarrito = !mostrarCarrito
        try {
            if(mostrarCarrito) {
                await renderTablaCarrito(carritoController.carrito)
            } else {
                elemSectionCarrito.classList.remove('section-carrito--visible')

            }

        } catch (error) {
            console.error(error)
            
        }
        
    })
}

function cerrarCarrito(){
    elemSectionCarrito.classList.remove('section-carrito--visible')
    mostrarCarrito = !mostrarCarrito
}

initCarrito()


