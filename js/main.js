const stockProductos = [
    {
        id: 1,
        nombre: "Babolat Pala Pádel Tech Viper Juan Lebrón",
        cantidad: 1,
        precio: 350000,
        img: "img/babolat_lebron.jpg",
    },
    {
        id: 2,
        nombre: "Nox Pala Pádel AT10 Genius By Agustin Tapia",
        cantidad: 1,
        precio: 125000,
        img: "img/nox_tapia.jpg",
    },
    {
        id: 3,
        nombre: "Adidas Pala Pádel Rx Carbon",
        cantidad: 1,
        precio: 57000,
        img: "img/adidas_carbon.jpg",
    },
    {
        id: 4,
        nombre: "Drop Shot Pala Pádel Conqueror 10",
        cantidad: 1,
        precio: 120000,
        img: "img/drop_shot.jpg",
    },
    {
        id: 5,
        nombre: "Varlion Pala Pádel Bourne Summum Prism W",
        cantidad: 1,
        precio: 73000,
        img: "img/varlion-pala-padel-bourne-summum-prism-w.jpg",
    },
    
]

let carrito = []

const contenedor = document.querySelector("#contenedor")
const vaciarCarrito = document.querySelector("#vaciarCarrito")
const precioTotal = document.querySelector("#precioTotal")

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || []
    mostrarCarrito()
})
stockProductos.forEach((prod) => {
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
        const item = stockProductos.find((prod) => prod.id === id)
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