document.addEventListener("DOMContentLoaded", async () => {
  const accessScreen = document.getElementById("access-screen");
  const chatScreen = document.getElementById("chat-screen");
  const guestNameInput = document.getElementById("guest-name");
  const guestAccessButton = document.getElementById("guest-access-button");
  const firebaseGoogleLoginButton = document.getElementById("firebase-google-login-button");
  const welcomeUser = document.getElementById("welcome-user");
  const connectionStatus = document.getElementById("connection-status");
  const chatMessages = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

  let socket = null;
  let currentUsername = "";

function showChatScreen() {
  accessScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");

  if (currentUsername && currentUsername.trim() !== "") {
    welcomeUser.textContent = `Bienvenido, ${currentUsername}`;
  } else {
    welcomeUser.textContent = "Bienvenido al chat";
  }
}

  function connectToChat() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      return;
    }

    socket = createWebSocketConnection();
    updateConnectionStatus(connectionStatus, "Estado: conectando...");

    socket.addEventListener("open", () => {
      updateConnectionStatus(connectionStatus, "Estado: conectado ✅");
      toggleChatControls(messageInput, sendButton, true);

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

guestAccessButton.addEventListener("click", () => {
  const guestName = guestNameInput.value.trim();

  currentUsername = guestName;
  showChatScreen();
  connectToChat();
});

  window.addEventListener("conecta2:firebase-authenticated", (event) => {
    const user = event.detail;
    currentUsername = user.name || user.email || "Usuario autenticado";

    appendMessage(chatMessages, {
      username: "Sistema",
      content: `Autenticado como ${currentUsername}`,
      timestamp: Date.now(),
      type: "SYSTEM",
    });

    showChatScreen();
    connectToChat();
  });

  try {
    const sessionResult = await getCurrentSession();

    if (sessionResult.ok && sessionResult.user) {
      currentUsername = sessionResult.user.name || sessionResult.user.email || "Usuario autenticado";
      showChatScreen();
      connectToChat();
    }
  } catch (error) {
    console.error("No se pudo recuperar la sesión actual:", error);
  }

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