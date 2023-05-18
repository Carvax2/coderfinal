const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { secretKey } = require('./keys');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      // Buscar el usuario en la base de datos por el ID
      const usuario = await Usuario.findById(payload.id);

      // Si el usuario no existe, retornar false
      if (!usuario) {
        return done(null, false);
      }

      // Verificar la contraseña
      const isMatch = await bcrypt.compare(payload.password, usuario.password);

      // Si la contraseña no coincide, retornar false
      if (!isMatch) {
        return done(null, false);
      }

      // Si todo está correcto, retornar el usuario
      done(null, usuario);
    } catch (error) {
      done(error, false);
    }
  })
);

module.exports = passport;
