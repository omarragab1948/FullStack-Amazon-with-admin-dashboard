import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrN5tJzLisk-npY2P5oA5aolmpQVU-RVo",
  authDomain: "fullstack-6a83e.firebaseapp.com",
  projectId: "fullstack-6a83e",
  storageBucket: "fullstack-6a83e.appspot.com",
  messagingSenderId: "43993505822",
  appId: "1:43993505822:web:781a6891978f0edcbcce0f",
  measurementId: "G-FG277YC7RR",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
