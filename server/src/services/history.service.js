const messageHistory = [];

const MAX_HISTORY_MESSAGES = 50;

function addMessageToHistory(message) {
  messageHistory.push(message);

  if (messageHistory.length > MAX_HISTORY_MESSAGES) {
    messageHistory.shift();
  }
}

function getMessageHistory() {
  return [...messageHistory];
}

module.exports = {
  addMessageToHistory,
  getMessageHistory,
};