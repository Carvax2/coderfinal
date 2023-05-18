const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registrar un nuevo usuario
router.post('/registro', authController.registrarUsuario);

// Ruta para iniciar sesión
router.post('/login', authController.iniciarSesion);

module.exports = router;