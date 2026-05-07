const http = require("http");

const { env } = require("./config/env");
const { createApp } = require("./app");
const { initializeWebSocket } = require("./websocket");
const { runMigrations } = require("./database/migrations");

const app = createApp();
const server = http.createServer(app);

initializeWebSocket(server);

async function startServer() {
  try {
    await runMigrations();
    console.log("Migraciones SQLite ejecutadas correctamente.");

    server.listen(env.PORT, env.HOST, () => {
      console.log(`Servidor HTTP ejecutándose en http://${env.HOST}:${env.PORT}`);
      console.log(`Health check disponible en http://${env.HOST}:${env.PORT}/health`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
    process.exit(1);
  }
}

startServer();