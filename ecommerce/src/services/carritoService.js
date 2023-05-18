const Producto = require('../models/Producto');

let carrito = [];

async function agregarProducto(idProducto) {
  const producto = await Producto.findById(idProducto);

  if (!producto) {
    throw new Error('Producto no encontrado');
  }

  carrito.push(producto);
}

function obtenerCarrito() {
  return carrito;
}

function eliminarProducto(id) {
  carrito = carrito.filter((producto) => producto._id.toString() !== id);
}

module.exports = {
  agregarProducto,
  obtenerCarrito,
  eliminarProducto,
};
