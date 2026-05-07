function healthController(_req, res) {
  return res.status(200).json({
    status: "ok",
    service: "Conecta2 API",
    timestamp: new Date().toISOString(),
  });
}

module.exports = {
  healthController,
};