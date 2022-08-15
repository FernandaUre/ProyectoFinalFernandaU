import { actualizarCarrito } from "./actualizarCarrito.js";
import { productos } from "./stock.js";

const contenedorCarrito = document.getElementById('carrito-contenedor');
export let carritoDeCompras = [];

export const carritoIndex = (productoId) => {
  if (localStorage.getItem("carrito")) {
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito"));
  }
  console.log(carritoDeCompras)
  let productoRepetido = carritoDeCompras.find(producto => producto.id == productoId);
  contarProductosRepetidos(productoRepetido, productoId);
  eliminarProductoCarrito(productoId);
}

export const eliminarProductoCarrito = (productoId, productoNombre) => {
  console.log(productoNombre);
  if (localStorage.getItem("carrito")) {
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito"));
  }
  let botonEliminar = document.getElementById(`eliminar${productoId}`);
  botonEliminar.addEventListener('click', () => {

    swal({
      title: `Seguro de eliminar este producto?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( (result) => {
      if (result) {
        botonEliminar.parentElement.remove();
        carritoDeCompras = carritoDeCompras.filter(el => el.id != productoId);
        actualizarCarrito(carritoDeCompras);
      }
    })
  });
}

const contarProductosRepetidos = (prodRepetido, productoId) => {
  if (prodRepetido) {
    prodRepetido.cantidad++
    document.getElementById(`cantidad${prodRepetido.id}`).innerHTML = `<p id=cantidad${prodRepetido.id}>Cantidad:${prodRepetido.cantidad}</p>`;
    actualizarCarrito(carritoDeCompras);
  } else {
    renderProductosCarrito(productoId);
  }
}

const renderProductosCarrito = (productoId) => {
  let producto = productos.find(producto => producto.id == productoId);
  carritoDeCompras.push(producto);
  producto.cantidad = 1;
  let div = document.createElement('div');
  div.classList.add('productoEnCarrito');
  div.innerHTML = `
                  <p>${producto.nombre}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                    <button id=eliminar${producto.id} class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                  `
  contenedorCarrito.appendChild(div);
  actualizarCarrito(carritoDeCompras);
}


function limpiar() {
  contenedorCarrito.innerHTML = "";
  while (contenedorCarrito.firstChild) {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

const btnVaciar = document.getElementById("btn-vaciar");
let contadorCarrito = document.getElementById("contador-carrito");

export const vaciarCarrito = () => {
if (carritoDeCompras.length > 0) {

    localStorage.clear();
    carritoDeCompras = [];
    contadorCarrito.innerHTML = 0;
    precioTotal.innerHTML = "";
    limpiar();

    btnVaciar.addEventListener('click', () => {
    swal({
      title: '',
      text: 'Todos tus productos se han quitado',
      icon: 'error',
      confirmButtonText: 'OK',
      timer: 3000
     })     
    })
  }   
};  

btnVaciar.addEventListener("click", vaciarCarrito);