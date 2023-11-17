// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Firebase configuration object with API keys and project details
const firebaseConfig = {
  apiKey: "AIzaSyATXERMiwp7Qbe9hg5RCeEZQcppzmOOIbU",
  authDomain: "numato-login-registration.firebaseapp.com",
  projectId: "numato-login-registration",
  storageBucket: "numato-login-registration.appspot.com",
  messagingSenderId: "717131922357",
  appId: "1:717131922357:web:52b77b9816f96427c237fc"
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Get Firestore instance for database operations
const db = getFirestore(app);

// Get Auth instance for user authentication
const auth = getAuth(app);
 
// Export the Auth and Firestore instances for use in other parts of the application
export { auth, db }; 