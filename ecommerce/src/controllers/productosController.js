const productosService = require('../services/productosService');

async function listarProductos(req, res) {
  try {
    const productos = await productosService.listarProductos();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
}

module.exports = {
  listarProductos,
};
