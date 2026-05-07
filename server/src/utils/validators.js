function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function sanitizeText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function validateUsername(username) {
  const cleanUsername = sanitizeText(username);

  return {
    isValid: cleanUsername.length >= 0 && cleanUsername.length <= 30,
    value: cleanUsername,
  };
}

function validateMessageContent(content) {
  const cleanContent = sanitizeText(content);

  return {
    isValid: cleanContent.length > 0 && cleanContent.length <= 500,
    value: cleanContent,
  };
}

module.exports = {
  isNonEmptyString,
  sanitizeText,
  validateUsername,
  validateMessageContent,
};