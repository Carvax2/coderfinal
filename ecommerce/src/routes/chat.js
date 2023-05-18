const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

// Ruta para enviar un mensaje
router.post('/', chatController.enviarMensaje);

// Ruta para obtener los mensajes generales
router.get('/', chatController.obtenerMensajesGenerales);

// Ruta para obtener los mensajes de un usuario específico
router.get('/:email', chatController.obtenerMensajesUsuario);

module.exports = router;
