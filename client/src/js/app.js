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

  // ✅ FUNCIÓN: Actualizar estado
  function updateConnectionStatus(element, text) {
    element.textContent = text;
  }

  // ✅ FUNCIÓN: Activar/desactivar controles
  function toggleChatControls(input, button, enabled) {
    input.disabled = !enabled;
    button.disabled = !enabled;
    input.placeholder = enabled ? "Escribe tu mensaje..." : "Conéctate primero";
  }

  // ✅ FUNCIÓN: Agregar mensajes a la pantalla
  function appendMessage(container, message) {
    const msgEl = document.createElement("div");
    msgEl.className = `message ${message.type === "SYSTEM" ? "system" : ""}`;
    
    const time = message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : "";
    
    msgEl.innerHTML = `
      <span class="time">${time}</span>
      <strong>${message.username}:</strong>
      <span class="content">${message.content}</span>
    `;
    container.appendChild(msgEl);
    container.scrollTop = container.scrollHeight;
  }

  // ✅ FUNCIÓN CENTRAL DE CONEXIÓN (ARREGLADA PARA LOCALTUNNEL)
  function conectarWebSocket() {
    // Llamamos a la función de websocket.js que ya arreglamos
    socket = createWebSocketConnection();

    // ✅ LOS EVENTOS VAN AQUÍ, FUERA DEL CLIC, ASÍ SIEMPRE FUNCIONAN
    socket.addEventListener("open", () => {
      updateConnectionStatus(connectionStatus, "Estado: conectado ✅");
      toggleChatControls(messageInput, sendButton, true);
      connectButton.disabled = true;
      usernameInput.disabled = true;

      // 📩 Enviamos nombre al servidor YA VALIDADO
      socket.send(
        JSON.stringify({
          event: "user:joined",
          username: currentUsername
        })
      );
    });

    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.event === "chat:history" && Array.isArray(data.messages)) {
          chatMessages.innerHTML = "";
          data.messages.forEach((message) => appendMessage(chatMessages, message));
          return;
        }

        if (data.event === "error") {
          appendMessage(chatMessages, {
            username: "Sistema",
            content: data.content,
            timestamp: data.timestamp || Date.now(),
            type: "SYSTEM"
          });
          return;
        }

        appendMessage(chatMessages, data);
      } catch (error) {
        console.error("Error al procesar:", error);
      }
    });

    socket.addEventListener("close", () => {
      updateConnectionStatus(connectionStatus, "Estado: desconectado ");
      toggleChatControls(messageInput, sendButton, false);
      connectButton.disabled = false;
      usernameInput.disabled = false;
      // ✅ AVISO CLARO PARA TU AMIGO
      appendMessage(chatMessages, {
        username: "Sistema",
        content: "Se perdió la conexión. Recarga la página.",
        timestamp: Date.now(),
        type: "SYSTEM"
      });
    });

    socket.addEventListener("error", (err) => {
      updateConnectionStatus(connectionStatus, "Estado: ERROR DE CONEXIÓN ");
      // ✅ ESTO ES LO QUE FALTABA: AVISARLE POR QUÉ FALLA
      alert("❌ No se pudo conectar. ¿Pasaste la pantalla de LocalTunnel?");
      console.error("Error:", err);
    });
  }

  // ✅ CLIC EN CONECTAR
  connectButton.addEventListener("click", () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      return;
    }

    // ✅ CÓDIGO SIMPLE SIN IAM: Solo limpiamos espacios
    currentUsername = usernameInput.value.trim();

    // ✅ Validación básica: Que no esté vacío
    if (!currentUsername) {
      alert("⚠️ Escribe un nombre de usuario válido");
      return;
    }

    // ✅ LLAMAMOS A LA FUNCIÓN ARREGLADA
    updateConnectionStatus(connectionStatus, "Estado: conectando...");
    conectarWebSocket();
  });

  // ✅ ENVIAR MENSAJE
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const content = messageInput.value.trim();

    // ✅ Validación simple sin IAM
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      appendMessage(chatMessages, {
        username: "Sistema",
        content: "❌ No estás conectado al servidor",
        timestamp: Date.now(),
        type: "SYSTEM"
      });
      return;
    }

    if (!content) {
      appendMessage(chatMessages, {
        username: "Sistema",
        content: "⚠️ No puedes enviar un mensaje vacío",
        timestamp: Date.now(),
        type: "SYSTEM"
      });
      return;
    }

    // ✅ Enviamos mensaje simple
    socket.send(
      JSON.stringify({
        event: "chat:message",
        username: currentUsername,
        content: content,
        timestamp: Date.now()
      })
    );

    messageInput.value = "";
  });

  // Inicializar controles desactivados
  toggleChatControls(messageInput, sendButton, false);
});