function generateTemporaryUsername(prefix = "Usuario") {
  const randomNumber = Math.floor(100 + Math.random() * 900);
  return `${prefix}_${randomNumber}`;
}

module.exports = {
  generateTemporaryUsername,
};