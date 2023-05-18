const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

async function crearUsuario(nombre, email, contraseña) {
  const hashContraseña = await bcrypt.hash(contraseña, 10);

  const usuario = new Usuario({
    nombre,
    email,
    contraseña: hashContraseña,
  });

  await usuario.save();
}

async function obtenerUsuarioPorEmail(email) {
  const usuario = await Usuario.findOne({ email });
  return usuario;
}

module.exports = {
  crearUsuario,
  obtenerUsuarioPorEmail,
};
