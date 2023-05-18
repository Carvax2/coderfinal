require('dotenv').config();

const config = {
  databaseUrl: process.env.DATABASE_URL,
  mail: process.env.MAIL_ADDRESS,
  sessionExpiration: parseInt(process.env.SESSION_DURATION),
  port: process.env.PORT,
};

module.exports = config;
