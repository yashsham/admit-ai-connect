import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD9oaem-ctNxN5hZHm0DVNCFGXzlPQx6VE",
  authDomain: "adminconnect-ai.firebaseapp.com",
  projectId: "adminconnect-ai",
  storageBucket: "adminconnect-ai.firebasestorage.app",
  messagingSenderId: "223631586738",
  appId: "1:223631586738:web:2f841a4b58f9a8f5a120ab",
  measurementId: "G-X6YMC4E9GR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);