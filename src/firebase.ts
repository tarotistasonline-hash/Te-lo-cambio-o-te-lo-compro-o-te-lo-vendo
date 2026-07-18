import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDW9eUWum36KpyYywtFF85f4YTcGZYZSCw",
  authDomain: "utility-sunbeam-r07pf.firebaseapp.com",
  projectId: "utility-sunbeam-r07pf",
  storageBucket: "utility-sunbeam-r07pf.firebasestorage.app",
  messagingSenderId: "633978869738",
  appId: "1:633978869738:web:06822ac2da76bb1ee2c493"
};

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with custom Database ID
export const db = initializeFirestore(app, {}, "ai-studio-ciudadtrueque-cc376e54-f174-46ec-a73e-9e60fdab9481");
export const auth = getAuth(app);
export const firebaseApp = app;
export const isFirebaseAvailable = true;

// Safe Messaging Initialization
export const getFirebaseMessaging = async () => {
  try {
    const { getMessaging, isSupported } = await import("firebase/messaging");
    const supported = await isSupported();
    if (supported) {
      return getMessaging(app);
    }
  } catch (err) {
    console.warn("FCM no es soportado en este navegador/entorno (ej: iframe sandbox sin permisos):", err);
  }
  return null;
};

