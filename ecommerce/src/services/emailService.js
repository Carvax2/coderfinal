const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno desde el archivo .env

// Configurar el servicio de transporte de nodemailer
const transporter = nodemailer.createTransport({
  service: 'nombre-del-servicio-de-correo',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Función para enviar un correo electrónico
const enviarCorreo = async (destinatario, asunto, cuerpo) => {
  try {
    // Configurar el correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: destinatario,
      subject: asunto,
      text: cuerpo,
    };

    // Enviar el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};

module.exports = {
  enviarCorreo,
};
