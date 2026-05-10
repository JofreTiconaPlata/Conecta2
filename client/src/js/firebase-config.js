const firebaseConfig = {
  apiKey: window.FIREBASE_API_KEY,
  authDomain: window.FIREBASE_AUTH_DOMAIN,
  projectId: window.FIREBASE_PROJECT_ID,
  appId: window.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);