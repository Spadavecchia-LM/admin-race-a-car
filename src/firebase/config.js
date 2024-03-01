
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpu0TojbfHQIF7n0U5xUnccg6WDRSOVqQ",
  authDomain: "raceacar-63c36.firebaseapp.com",
  projectId: "raceacar-63c36",
  storageBucket: "raceacar-63c36.appspot.com",
  messagingSenderId: "587840783842",
  appId: "1:587840783842:web:dc18d17ed9ccf9eb4de5bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)