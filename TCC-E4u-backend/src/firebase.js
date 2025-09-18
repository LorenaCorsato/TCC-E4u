import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Cole aqui as suas credenciais do Firebase para a WEB
// Você encontra isso no Console do Firebase > Configurações do Projeto > Seus apps > App da Web
const firebaseConfig = {
  apiKey: "AIzaSyAFtZw90wvb06usd9khuH6oth7bI6JW9E8",
  authDomain: "e4u-2b27b.firebaseapp.com",
  projectId: "e4u-2b27b",
  storageBucket: "e4u-2b27b.firebasestorage.app",
  messagingSenderId: "737591044094",
  appId: "1:737591044094:web:30cec118a72185078442af"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);