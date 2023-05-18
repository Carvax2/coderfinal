const express = require('express');
const carritoController = require('../controllers/carritoController');

const router = express.Router();

// Ruta para agregar un producto al carrito de compras
router.post('/', carritoController.agregarProducto);

// Ruta para obtener el contenido del carrito de compras
router.get('/', carritoController.obtenerCarrito);

// Ruta para eliminar un producto del carrito de compras
router.delete('/producto/:id', carritoController.eliminarProducto);

module.exports = router;
