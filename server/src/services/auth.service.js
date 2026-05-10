const { admin } = require("../config/firebase-admin");

async function verifyFirebaseIdToken(idToken) {
  const decodedToken = await admin.auth().verifyIdToken(idToken);

  return {
    uid: decodedToken.uid,
    email: decodedToken.email || "",
    name: decodedToken.name || "",
    picture: decodedToken.picture || "",
    emailVerified: decodedToken.email_verified || false,
  };
}

module.exports = {
  verifyFirebaseIdToken,
};