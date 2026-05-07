document.addEventListener("DOMContentLoaded", () => {
  const connectButton = document.getElementById("connect-button");
  const usernameInput = document.getElementById("username");
  const connectionStatus = document.getElementById("connection-status");
  const chatMessages = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

  let socket = null;
  let currentUsername = "";

  connectButton.addEventListener("click", () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      return;
    }

    currentUsername = sanitizeText(usernameInput.value);

    socket = createWebSocketConnection();

    updateConnectionStatus(connectionStatus, "Estado: conectando...");

    socket.addEventListener("open", () => {
      updateConnectionStatus(connectionStatus, "Estado: conectado");
      toggleChatControls(messageInput, sendButton, true);
      connectButton.disabled = true;
      usernameInput.disabled = true;
    });

    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        appendMessage(chatMessages, data);
      } catch (error) {
        console.error("No se pudo procesar el mensaje recibido:", error);
      }
    });

    socket.addEventListener("close", () => {
      updateConnectionStatus(connectionStatus, "Estado: desconectado");
      toggleChatControls(messageInput, sendButton, false);
      connectButton.disabled = false;
      usernameInput.disabled = false;
    });

    socket.addEventListener("error", () => {
      updateConnectionStatus(connectionStatus, "Estado: error de conexión");
    });
  });

  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const content = sanitizeText(messageInput.value);

    if (!socket || socket.readyState !== WebSocket.OPEN || !content) {
      return;
    }

    const payload = {
      username: currentUsername || "Usuario_local",
      content,
      timestamp: new Date().toISOString(),
      type: "CHAT",
    };

    socket.send(JSON.stringify(payload));
    messageInput.value = "";
  });
});