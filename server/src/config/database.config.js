const { env } = require("./env");

const databaseConfig = {
  path: env.DB_PATH,
};

module.exports = {
  databaseConfig,
};