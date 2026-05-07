const WebSocket = require("ws");

function initializeWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (socket) => {
    console.log("Cliente conectado al WebSocket");

    socket.send(
      JSON.stringify({
        type: "SYSTEM",
        content: "Conexión WebSocket establecida correctamente.",
        timestamp: new Date().toISOString(),
      })
    );

    socket.on("message", (messageBuffer) => {
      const message = messageBuffer.toString();

      console.log("Mensaje recibido:", message);
    });

    socket.on("close", () => {
      console.log("Cliente desconectado del WebSocket");
    });

    socket.on("error", (error) => {
      console.error("Error en WebSocket:", error.message);
    });
  });

  return wss;
}

module.exports = {
  initializeWebSocket,
};