const http = require("http");

const { env } = require("./config/env");
const { createApp } = require("./app");
const { initializeWebSocket } = require("./websocket");

const app = createApp();
const server = http.createServer(app);

initializeWebSocket(server);

server.listen(env.PORT, env.HOST, () => {
  console.log(`Servidor HTTP ejecutándose en http://${env.HOST}:${env.PORT}`);
  console.log(`Health check disponible en http://${env.HOST}:${env.PORT}/health`);
});