const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const passport = require('passport');
const passportJWT = require('passport-jwt');
const dotenv = require('dotenv');
const cors = require('cors');

// Configurar variables de entorno
dotenv.config();

// Importar modelos
const Usuario = require('./models/usuario');
const Producto = require('./models/producto');
const Carrito = require('./models/carrito');
const Mensaje = require('./models/mensaje');

// Importar rutas
const authRoutes = require('./routes/auth');
const productoRoutes = require('./routes/productos');
const carritoRoutes = require('./routes/carrito');
const chatRoutes = require('./routes/chat');

// Inicializar la aplicación Express
const app = express();

// Configurar middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar sesión y almacenamiento en MongoDB
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions',
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: parseInt(process.env.SESSION_EXPIRATION),
    },
  })
);

// Configurar Passport
app.use(passport.initialize());
app.use(passport.session());

// Configurar estrategia de autenticación JWT
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      Usuario.findById(jwtPayload.id)
        .then((usuario) => {
          if (usuario) {
            return done(null, usuario);
          } else {
            return done(null, false);
          }
        })
        .catch((error) => {
          return done(error, false);
        });
    }
  )
);

// Configurar rutas
app.use('/auth', authRoutes);
app.use('/productos', passport.authenticate('jwt', { session: false }), productoRoutes);
app.use('/carrito', passport.authenticate('jwt', { session: false }), carritoRoutes);
app.use('/chat', passport.authenticate('jwt', { session: false }), chatRoutes);

// Conectar a la base de datos
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    // Iniciar el servidor
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });
