const { createMessageDTO } = require("../../../shared/dto/message.dto");
const { MESSAGE_TYPES } = require("../constants/message-types");
const { validateMessageContent } = require("../utils/validators");

function buildChatMessage({ username, content }) {
  const validation = validateMessageContent(content);

  if (!validation.isValid) {
    return {
      isValid: false,
      error: "El mensaje es inválido.",
      message: null,
    };
  }

  const message = createMessageDTO({
    username,
    content: validation.value,
    type: MESSAGE_TYPES.CHAT,
  });

  return {
    isValid: true,
    error: null,
    message,
  };
}

function buildSystemMessage({ content }) {
  const message = createMessageDTO({
    username: "Sistema",
    content,
    type: MESSAGE_TYPES.SYSTEM,
  });

  return {
    isValid: true,
    error: null,
    message,
  };
}

module.exports = {
  buildChatMessage,
  buildSystemMessage,
};