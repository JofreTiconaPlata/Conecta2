function createEventDTO({
  event,
  username,
  content,
  timestamp = new Date().toISOString(),
}) {
  return {
    event,
    username,
    content,
    timestamp,
  };
}

module.exports = {
  createEventDTO,
};