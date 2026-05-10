const dotenv = require("dotenv");

dotenv.config();

const env = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || "0.0.0.0",
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_PATH: process.env.DB_PATH || "database/conecta2.db",

  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || "",
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL || "",
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY || "",
  SESSION_SECRET: process.env.SESSION_SECRET || "conecta2_dev_secret",
};

module.exports = {
  env,
};