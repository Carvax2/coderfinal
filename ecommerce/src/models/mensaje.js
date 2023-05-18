const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

module.exports = Mensaje;
