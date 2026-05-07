function createMessageDTO({
  id = null,
  username,
  content,
  timestamp = new Date().toISOString(),
  type = "CHAT",
}) {
  return {
    id,
    username,
    content,
    timestamp,
    type,
  };
}

module.exports = {
  createMessageDTO,
};