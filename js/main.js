


let carrito = []

const contenedor = document.querySelector("#contenedor")
const vaciarCarrito = document.querySelector("#vaciarCarrito")
const precioTotal = document.querySelector("#precioTotal")
const procesarCompra = document.querySelector("#procesarCompra")

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || []
    mostrarCarrito()
})

fetch("./data/productos.json")
    .then((reponse) => reponse.json())
    .then((data) => {

        data.forEach((prod) => {
            const { id, nombre, cantidad, precio, img } = prod
            contenedor.innerHTML += `
        <div class="card mt-3 container" style="width: 20rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button oneclick="agregarProductor(${id})" class="btn btn-warning" onclick="agregarProducto(${id})">Comprar Producto</button>
        </div>
    </div>
        
        `
        })
    })



procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
            title: "¡Tu carrito está vacio!",
            text: "Compra algo para continuar con la compra",
            icon: "error",
            confirmButtonText: "Aceptar",
        })
    } else {
        location.href = "http://link.mercadopago.com.ar/padelfactory"
    }
})

vaciarCarrito.addEventListener("click", () => {
    carrito.length = []
    mostrarCarrito()


})

function agregarProducto(id) {
    const existe = carrito.some(prod => prod.id === id)
    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === id) {
                prod.cantidad++
            }
        })
    } else {
        const item = prod.find((prod) => prod.id === id)
        carrito.push(item)

    }

    mostrarCarrito()
}

const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
        modalBody.innerHTML = "";
        carrito.forEach((prod) => {
            const { id, nombre, precio, desc, img, cantidad } = prod;
            console.log(modalBody);
            modalBody.innerHTML += `
        <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button onclick="eliminarProducto(${id})" class="btn btn-danger">Eliminar producto</button>
        </div>
        </div>
        
    
        `;
        });

        if (carrito.length === 0) {
            modalBody.innerHTML = `
            <p class="text-center text-warning parrafo">Aun no agregaste nada</p>
            `

        } else {
        }

    }
    precioTotal.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    guardarStorage()

}

function eliminarProducto(id) {
    const palaId = id
    carrito = carrito.filter((pala) => pala.id !== palaId)
    mostrarCarrito()

}

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}