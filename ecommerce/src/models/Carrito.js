const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  productos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
  }],
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
});

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = Carrito;
