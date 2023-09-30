import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqHYSCcOytIHXRvMfZ_jr2iwmFmwbaPko",
  authDomain: "jcwd240403.firebaseapp.com",
  projectId: "jcwd240403",
  storageBucket: "jcwd240403.appspot.com",
  messagingSenderId: "666143308330",
  appId: "1:666143308330:web:581627d2075161e006e153",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
