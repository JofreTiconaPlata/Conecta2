async function sendFirebaseTokenToBackend(idToken) {
  const response = await fetch("/auth/firebase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken }),
  });

  return response.json();
}

async function getCurrentSession() {
  const response = await fetch("/auth/session");
  return response.json();
}

async function signInWithGoogleFirebase() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);

  const user = result.user;
  const idToken = await user.getIdToken();

  const backendResult = await sendFirebaseTokenToBackend(idToken);

  if (!backendResult.ok) {
    throw new Error("No se pudo validar la sesión en el backend.");
  }

  window.dispatchEvent(
    new CustomEvent("conecta2:firebase-authenticated", {
      detail: backendResult.user,
    })
  );
}


