const Producto = require('../models/producto');

const obtenerProducto = async (req, res) => {
  try {
    const productos = await Producto.find({});
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al obtener los productos' });
  }
};

const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;
    const producto = new Producto({ nombre, descripcion, precio });
    await producto.save();
    res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al crear el producto' });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;
    const producto = await Producto.findByIdAndUpdate(
      id,
      { nombre, descripcion, precio },
      { new: true }
    );
    res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al actualizar el producto' });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await Producto.findByIdAndDelete(id);
    res.json({ mensaje: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto' });
  }
};

module.exports = {
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
