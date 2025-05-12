import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAFtZw90wvb06usd9khuH6oth7bI6JW9E8",
  authDomain: "e4u-2b27b.firebaseapp.com",
  projectId: "e4u-2b27b",
  storageBucket: "e4u-2b27b.firebasestorage.app",
  messagingSenderId: "737591044094",
  appId: "1:737591044094:web:30cec118a72185078442af"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };