const dotenv = require("dotenv");

dotenv.config();

const env = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || "0.0.0.0",
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_PATH: process.env.DB_PATH || "database/conecta2.db",
};

module.exports = {
  env,
};