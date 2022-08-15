import { carritoIndex } from "./carritoIndex.js";
import { getData } from "./getData.js";

export const mostrarProductos = async () => {

  const productos = await getData();
  const contenedorProductos = document.getElementById("producto-contenedor");

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML += `<div class="card-image">
                            <img src=${producto.img}>
                            <h4 id="titulo-card">${producto.nombre}</h4>
                            <p id="texto-tonos">Tono/s disponibles: ${producto.tonos}</p>
                            <h6 id="texto-stock">En stock</h6>
                            <h5 id="precio">$${producto.precio}</h5>
                            <button class="boton-card" id="boton${producto.id}">Añadir al carrito</button>
                            </div>
                            `
    contenedorProductos.appendChild(div);
   

  const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener('click', () => {
    carritoIndex(producto.id);
    Swal.fire({
      title: "Con exito!",
      text: "Tu producto se añadió al carrito",
      icon: "success",
      confirm: "Ok",
    })
  })
})
};