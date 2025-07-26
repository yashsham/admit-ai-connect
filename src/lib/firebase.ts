import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "admitconnect-ai.firebaseapp.com",
  projectId: "admitconnect-ai",
  storageBucket: "admitconnect-ai.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);