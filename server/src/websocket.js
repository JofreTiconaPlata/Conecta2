const WebSocket = require("ws");
const { SOCKET_EVENTS } = require("../../shared/constants/socket-events");
const { handleConnection } = require("./services/websocket.service");

function initializeWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    console.log("Cliente conectado al WebSocket");
    handleConnection(wss, socket);
  });

  return wss;
}

module.exports = {
  initializeWebSocket,
};