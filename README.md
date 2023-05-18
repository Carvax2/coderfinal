# Proyecto de E-commerce Backend

Este repositorio contiene el código fuente del backend para una aplicación de E-commerce. Esta aplicación permite la venta de productos de un rubro específico y brinda funcionalidades como registro de usuarios, autenticación basada en JWT, gestión de carrito de compras y un canal de chat para consultas.

## Características

- Implementación de una API RESTful con los verbos GET, POST, PUT y DELETE para interactuar con los productos y el carrito de compras.
- Uso de MongoDB como base de datos para almacenar los productos, usuarios y mensajes del chat.
- Autenticación de usuarios utilizando JWT (Json Web Token) para garantizar la seguridad de las operaciones.
- Envío de correos electrónicos al registrar un nuevo usuario y al generar una orden de compra.
- Implementación de un canal de chat basado en websockets para atender las consultas de los usuarios.
- Configuración flexible a través de un archivo externo que permite ajustar parámetros como el puerto de escucha, la URL de la base de datos y la dirección de correo para notificaciones.
- Arquitectura basada en capas (MVC) para un código organizado y mantenible.

## Tecnologías utilizadas

- Node.js: entorno de ejecución para JavaScript en el servidor.
- Express.js: framework web para facilitar el desarrollo de la aplicación.
- MongoDB: base de datos NoSQL para el almacenamiento persistente de los datos.
- Passport JWT: middleware para la autenticación basada en JWT.
- Socket.IO: biblioteca de websockets para implementar el canal de chat en tiempo real.
- Nodemailer: módulo para enviar correos electrónicos desde el backend.
- Dotenv: biblioteca para cargar variables de entorno desde un archivo externo.

## Instalación y configuración

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar las dependencias.
3. Crea un archivo `.env` en la raíz del proyecto y define las variables de entorno necesarias.
4. Ajusta las configuraciones de la base de datos, correo electrónico y otros parámetros en el archivo `config.js`.
5. Ejecuta `npm start` para iniciar el servidor.
6. Accede a la aplicación a través de `http://localhost:3000` (o el puerto que hayas configurado).

