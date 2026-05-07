const SOCKET_EVENTS = Object.freeze({
  CONNECTION: "connection",
  MESSAGE: "message",
  CHAT_MESSAGE: "chat:message",
  CHAT_HISTORY: "chat:history",
  SYSTEM_MESSAGE: "system:message",
  USER_JOINED: "user:joined",
  USER_LEFT: "user:left",
  ERROR: "error",
});

module.exports = {
  SOCKET_EVENTS,
};