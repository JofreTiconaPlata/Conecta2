const { SOCKET_EVENTS } = require("../../../shared/constants/socket-events");
const { buildChatMessage, buildSystemMessage } = require("./chat.service");
const {
  registerUser,
  removeUser,
  getUserBySocket,
} = require("./user.service");
const {
  addMessageToHistory,
  getMessageHistory,
} = require("./history.service");

function sendToSocket(socket, payload) {
  socket.send(JSON.stringify(payload));
}

function broadcast(wss, payload) {
  const serializedPayload = JSON.stringify(payload);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(serializedPayload);
    }
  });
}

function handleConnection(wss, socket) {
  socket.on(SOCKET_EVENTS.MESSAGE, async (messageBuffer) => {
    try {
      const data = JSON.parse(messageBuffer.toString());

      if (data.event === SOCKET_EVENTS.USER_JOINED) {
        const registeredUser = registerUser(socket, data.username);

        const historyPayload = {
          event: SOCKET_EVENTS.CHAT_HISTORY,
          messages: await getMessageHistory(),
        };

        sendToSocket(socket, historyPayload);

        const systemResult = buildSystemMessage({
          content: `${registeredUser.username} se unió al chat.`,
        });

        await addMessageToHistory(systemResult.message);
        broadcast(wss, systemResult.message);
        return;
      }

      if (data.event === SOCKET_EVENTS.CHAT_MESSAGE) {
        const currentUser = getUserBySocket(socket);

        if (!currentUser) {
          const errorPayload = {
            event: SOCKET_EVENTS.ERROR,
            content: "Usuario no registrado en la sesión actual.",
            timestamp: new Date().toISOString(),
          };

          sendToSocket(socket, errorPayload);
          return;
        }

        const result = buildChatMessage({
          username: currentUser.username,
          content: data.content,
        });

        if (!result.isValid) {
          const errorPayload = {
            event: SOCKET_EVENTS.ERROR,
            content: result.error,
            timestamp: new Date().toISOString(),
          };

          sendToSocket(socket, errorPayload);
          return;
        }

        await addMessageToHistory(result.message);
        broadcast(wss, result.message);
      }
    } catch (error) {
      console.error("Error procesando mensaje WebSocket:", error.message);

      const errorPayload = {
        event: SOCKET_EVENTS.ERROR,
        content: "No se pudo procesar el mensaje recibido.",
        timestamp: new Date().toISOString(),
      };

      sendToSocket(socket, errorPayload);
    }
  });

  socket.on("close", async () => {
    try {
      const removedUser = removeUser(socket);

      if (!removedUser) {
        return;
      }

      const systemResult = buildSystemMessage({
        content: `${removedUser.username} salió del chat.`,
      });

      await addMessageToHistory(systemResult.message);
      broadcast(wss, systemResult.message);
    } catch (error) {
      console.error("Error al procesar desconexión:", error.message);
    }
  });

  socket.on("error", (error) => {
    console.error("Error en WebSocket:", error.message);
  });
}

module.exports = {
  handleConnection,
};