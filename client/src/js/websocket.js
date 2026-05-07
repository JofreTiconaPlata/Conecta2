function createWebSocketConnection() {
  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const socketUrl = `${protocol}://${window.location.host}`;

  return new WebSocket(socketUrl);
}