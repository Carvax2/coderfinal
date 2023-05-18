const usuariosService = require('../services/usuariosService');

async function crearUsuario(req, res) {
  const { nombre, email, contraseña } = req.body;

  try {
    await usuariosService.crearUsuario(nombre, email, contraseña);
    res.status(201).json({ message: 'Usuario creado con exito, buena esa' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
}

async function obtenerUsuario(req, res) {
  const { email } = req.params;

  try {
    const usuario = await usuariosService.obtenerUsuarioPorEmail(email);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
}

module.exports = {
  crearUsuario,
  obtenerUsuario,
};
