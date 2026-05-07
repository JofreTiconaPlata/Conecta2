const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const { databaseConfig } = require("../config/database.config");

const databasePath = path.resolve(process.cwd(), databaseConfig.path);

const db = new sqlite3.Database(databasePath, (error) => {
  if (error) {
    console.error("Error al conectar con SQLite:", error.message);
    return;
  }

  console.log(`Base de datos SQLite conectada en: ${databasePath}`);
});

module.exports = {
  db,
};