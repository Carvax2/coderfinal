const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// Registrar un nuevo usuario
async function registrarUsuario(req, res) {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario ya está registrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El usuario ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      email,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    // Redireccionar a /productos si el usuario ya ha iniciado sesión
    if (req.isAuthenticated()) {
      return res.redirect('/productos');
    }

    // Resto del código para redireccionar al formulario de inicio de sesión
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error, contacta al tutor de coderhouse para que te ayude' });
  }
}

// Iniciar sesión
async function iniciarSesion(req, res) {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: 'usuario y contraseña incorrectos' });
    }

    // Verificar la contraseña
    const esContrasenaValida = await bcrypt.compare(password, usuario.password);
    if (!esContrasenaValida) {
      return res.status(400).json({ message: 'Revisa los datos, contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: usuario._id, email: usuario.email }, process.env.JWT_SECRET);

    // Establecer el token en las cookies de la respuesta
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: parseInt(process.env.SESSION_DURATION),
    });

    // Redireccionar a /productos si el usuario ha iniciado sesión correctamente
    if (req.isAuthenticated()) {
      return res.redirect('/productos');
    }

    // Resto del código para redireccionar al formulario de inicio de sesión
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error' });
  }
}

module.exports = {
  registrarUsuario,
  iniciarSesion,
};
