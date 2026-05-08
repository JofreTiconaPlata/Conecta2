function createWebSocketConnection() {
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const socketUrl = `${protocol}://${window.location.host}`;

  console.log("Conectando WebSocket a:", socketUrl);

  return new WebSocket(socketUrl);
}
