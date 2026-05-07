const { getRecentMessages, saveMessage } = require("../repositories/message.repository");
const { saveEvent } = require("../repositories/event.repository");
const { MESSAGE_TYPES } = require("../constants/message-types");

const MAX_HISTORY_MESSAGES = 50;

async function addMessageToHistory(message) {
  if (!message) {
    return null;
  }

  if (message.type === MESSAGE_TYPES.SYSTEM) {
    return saveEvent({
      eventType: "SYSTEM",
      username: message.username || "Sistema",
      content: message.content,
      timestamp: message.timestamp,
    });
  }

  return saveMessage({
    username: message.username,
    content: message.content,
    type: message.type,
    timestamp: message.timestamp,
  });
}

async function getMessageHistory() {
  return getRecentMessages(MAX_HISTORY_MESSAGES);
}

module.exports = {
  addMessageToHistory,
  getMessageHistory,
};