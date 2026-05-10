document.addEventListener("DOMContentLoaded", async () => {
  const connectButton = document.getElementById("connect-button");
  const usernameInput = document.getElementById("username");
  const connectionStatus = document.getElementById("connection-status");
  const chatMessages = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const firebaseGoogleLoginButton = document.getElementById("firebase-google-login-button");

  let socket = null;
  let currentUsername = "";

  function conectarWebSocket() {
    socket = createWebSocketConnection();

    socket.addEventListener("open", () => {
      updateConnectionStatus(connectionStatus, "Estado: conectado ✅");
      toggleChatControls(messageInput, sendButton, true);
      connectButton.disabled = true;
      usernameInput.disabled = true;

      socket.send(
        JSON.stringify({
          event: "user:joined",
          username: currentUsername,
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
            type: "SYSTEM",
          });
          return;
        }

        appendMessage(chatMessages, data);
      } catch (error) {
        console.error("Error al procesar mensaje:", error);
      }
    });

    socket.addEventListener("close", () => {
      updateConnectionStatus(connectionStatus, "Estado: desconectado ❌");
      toggleChatControls(messageInput, sendButton, false);
      connectButton.disabled = false;
      usernameInput.disabled = false;

      appendMessage(chatMessages, {
        username: "Sistema",
        content: "Se perdió la conexión. Recarga la página.",
        timestamp: Date.now(),
        type: "SYSTEM",
      });
    });

    socket.addEventListener("error", (error) => {
      updateConnectionStatus(connectionStatus, "Estado: error de conexión ⚠️");
      console.error("Error de WebSocket:", error);
    });
  }

  if (firebaseGoogleLoginButton) {
    firebaseGoogleLoginButton.addEventListener("click", async () => {
      try {
        await signInWithGoogleFirebase();
      } catch (error) {
        alert("No se pudo iniciar sesión con Google usando Firebase.");
        console.error(error);
      }
    });
  }

  window.addEventListener("conecta2:firebase-authenticated", (event) => {
    const user = event.detail;
    currentUsername = user.name || user.email || "";
    usernameInput.value = currentUsername;
    usernameInput.disabled = true;

    appendMessage(chatMessages, {
      username: "Sistema",
      content: `Autenticado como ${currentUsername}`,
      timestamp: Date.now(),
      type: "SYSTEM",
    });
  });

  try {
    const sessionResult = await getCurrentSession();

    if (sessionResult.ok && sessionResult.user) {
      currentUsername = sessionResult.user.name || sessionResult.user.email || "";
      usernameInput.value = currentUsername;
      usernameInput.disabled = true;

      appendMessage(chatMessages, {
        username: "Sistema",
        content: `Sesión detectada para ${currentUsername}`,
        timestamp: Date.now(),
        type: "SYSTEM",
      });
    }
  } catch (error) {
    console.error("No se pudo recuperar la sesión actual:", error);
  }

  connectButton.addEventListener("click", async () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      return;
    }

    if (!currentUsername) {
      currentUsername = usernameInput.value.trim();
    }

    if (!currentUsername) {
      alert("⚠️ Escribe un nombre válido o inicia sesión con Google.");
      return;
    }

    updateConnectionStatus(connectionStatus, "Estado: conectando...");
    conectarWebSocket();
  });

  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const content = messageInput.value.trim();

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      appendMessage(chatMessages, {
        username: "Sistema",
        content: "❌ No estás conectado al servidor",
        timestamp: Date.now(),
        type: "SYSTEM",
      });
      return;
    }

    if (!content) {
      appendMessage(chatMessages, {
        username: "Sistema",
        content: "⚠️ No puedes enviar un mensaje vacío",
        timestamp: Date.now(),
        type: "SYSTEM",
      });
      return;
    }

    socket.send(
      JSON.stringify({
        event: "chat:message",
        content,
      })
    );

    messageInput.value = "";
  });

  toggleChatControls(messageInput, sendButton, false);
});