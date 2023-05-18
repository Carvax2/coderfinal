const express = require('express');
const productosController = require('../controllers/productosController');

const router = express.Router();

// Ruta para listar los productos existentes
router.get('/', productosController.listarProductos);

// Ruta para obtener detalles de un producto específico
router.get('/:id', productosController.obtenerProducto);

// Ruta para ingresar un nuevo producto
router.post('/', productosController.crearProducto);

// Ruta para modificar detalles de un producto específico
router.put('/:id', productosController.actualizarProducto);

// Ruta para borrar un producto específico
router.delete('/:id', productosController.eliminarProducto);

module.exports = router;
