const carritoService = require('../services/carritoService');

async function agregarProducto(req, res) {
  const { idProducto } = req.body;

  try {
    await carritoService.agregarProducto(idProducto);
    res.status(200).json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
}

async function obtenerCarrito(req, res) {
  try {
    const carrito = await carritoService.obtenerCarrito();
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el contenido del carrito' });
  }
}

async function eliminarProducto(req, res) {
  const { id } = req.params;

  try {
    await carritoService.eliminarProducto(id);
    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
}

module.exports = {
  agregarProducto,
  obtenerCarrito,
  eliminarProducto,
};
