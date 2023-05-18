const express = require('express');
const usuariosController = require('../controllers/usuariosController');

const router = express.Router();

router.post('/', usuariosController.crearUsuario);
router.get('/:email', usuariosController.obtenerUsuario);

module.exports = router;
