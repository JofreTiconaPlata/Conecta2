const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { healthController } = require("./controllers/health.controller");
const {
  firebaseAuthController,
  sessionController,
  logoutController,
} = require("./controllers/auth.controller");
const { sessionMiddleware } = require("./middlewares/session.middleware");

function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(sessionMiddleware);

  app.get("/health", healthController);

  app.post("/auth/firebase", async (req, res) => {
    await firebaseAuthController(req, res);

    if (req.session && req.session.user) {
      res.cookie("conecta2_session", JSON.stringify(req.session), {
        httpOnly: false,
        sameSite: "lax",
      });
    }
  });

  app.get("/auth/session", sessionController);

  app.post("/auth/logout", (req, res) => {
    logoutController(req, res);
    res.clearCookie("conecta2_session");
  });

  app.use(express.static(path.join(process.cwd(), "client", "src")));

  app.get("/", (_req, res) => {
    return res.sendFile(path.join(process.cwd(), "client", "src", "index.html"));
  });

  return app;
}

module.exports = {
  createApp,
};