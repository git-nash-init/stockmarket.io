// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Check if environment variables are available
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

if (missingVars.length > 0) {
  console.warn('Missing Firebase environment variables:', missingVars);
  console.warn('Firebase features will be disabled. Please check your .env file.');
}

// Create mock Firebase config if environment variables are missing
const createMockConfig = () => ({
  apiKey: "demo-key",
  authDomain: "demo.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
});

// Get Firebase config from environment or use mock
const getFirebaseConfig = () => {
  if (missingVars.length > 0) {
    return createMockConfig();
  }
  
  return {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
  };
};

let app;
let auth;
let db;
let storage;

try {
  const firebaseConfig = getFirebaseConfig();
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  if (missingVars.length > 0) {
    console.warn('Firebase initialized with mock configuration. Features will be limited.');
  } else {
    console.log('Firebase initialized successfully with environment configuration.');
  }
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  // Create mock objects to prevent crashes
  auth = null;
  db = null;
  storage = null;
}

export { auth, db, storage };
