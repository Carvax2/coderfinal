const Mensaje = require('../models/mensaje');

const enviarMensaje = async (req, res) => {
  try {
    const { contenido, autor } = req.body;
    const mensaje = new Mensaje({ contenido, autor });
    await mensaje.save();
    req.io.emit('message', mensaje); // Emitir el mensaje a todos los usuarios conectados
    res.json(mensaje);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error , mensaje no enviado' });
  }
};

const obtenerMensajesGenerales = async (req, res) => {
  try {
    const mensajes = await Mensaje.find({});
    res.json(mensajes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error obteniendo los mensajes' });
  }
};

const obtenerMensajesUsuario = async (req, res) => {
  try {
    const { email } = req.params;
    const mensajes = await Mensaje.find({ autor: email });
    res.json(mensajes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'No hemos podido obtener los mensajes del usuario' });
  }
};

module.exports = {
  enviarMensaje,
  obtenerMensajesGenerales,
  obtenerMensajesUsuario,
};
