const express = require("express");
const path = require("path");

const { healthController } = require("./controllers/health.controller");

function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/health", healthController);

  app.use(express.static(path.join(process.cwd(), "client", "src")));

  app.get("/", (_req, res) => {
    return res.sendFile(path.join(process.cwd(), "client", "src", "index.html"));
  });

  return app;
}

module.exports = {
  createApp,
};