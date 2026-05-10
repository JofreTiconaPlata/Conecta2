const { verifyFirebaseIdToken } = require("../services/auth.service");

async function firebaseAuthController(req, res) {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        ok: false,
        message: "No se recibió el Firebase ID token.",
      });
    }

    const user = await verifyFirebaseIdToken(idToken);

    req.session.user = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      picture: user.picture,
      emailVerified: user.emailVerified,
    };

    return res.status(200).json({
      ok: true,
      user: req.session.user,
    });
  } catch (_error) {
    return res.status(401).json({
      ok: false,
      message: "No se pudo validar la sesión con Firebase.",
    });
  }
}

function sessionController(req, res) {
  return res.status(200).json({
    ok: true,
    user: req.session.user || null,
  });
}

function logoutController(req, res) {
  req.session.user = null;

  return res.status(200).json({
    ok: true,
    message: "Sesión cerrada correctamente.",
  });
}

module.exports = {
  firebaseAuthController,
  sessionController,
  logoutController,
};