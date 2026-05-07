const { generateTemporaryUsername } = require("../utils/username-generator");
const { sanitizeText } = require("../utils/validators");

const connectedUsers = new Map();

function registerUser(socket, providedUsername) {
  const cleanUsername = sanitizeText(providedUsername);
  const username = cleanUsername || generateTemporaryUsername();

  connectedUsers.set(socket, {
    username,
    connectedAt: new Date().toISOString(),
  });

  return {
    username,
  };
}

function removeUser(socket) {
  const userData = connectedUsers.get(socket) || null;
  connectedUsers.delete(socket);
  return userData;
}

function getUserBySocket(socket) {
  return connectedUsers.get(socket) || null;
}

function getConnectedUsersCount() {
  return connectedUsers.size;
}

module.exports = {
  registerUser,
  removeUser,
  getUserBySocket,
  getConnectedUsersCount,
};