function sessionMiddleware(req, _res, next) {
  const rawSession = req.cookies?.conecta2_session;

  if (!rawSession) {
    req.session = {};
    return next();
  }

  try {
    req.session = JSON.parse(rawSession);
  } catch (_error) {
    req.session = {};
  }

  return next();
}

module.exports = {
  sessionMiddleware,
};