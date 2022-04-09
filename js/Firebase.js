import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { collection, getDocs, addDoc, Timestamp, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { query, orderBy, limit, where, onSnapshot} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBtkcGUGMglsEGnIsWNsAS4OisZ9axvAXw",
    authDomain: "note-tify.firebaseapp.com",
    projectId: "note-tify",
    storageBucket: "note-tify.appspot.com",
    messagingSenderId: "297215566376",
    appId: "1:297215566376:web:d62aa774996f51555b8b1d",
    measurementId: "G-P2EKJXB3YC"
  };

  if(!firebaseConfig.apiKey) throw new Error("Missing firebase credentials: apiKey");
  if(!firebaseConfig.authDomain) throw new Error("Missing firebase credentials: authDomain");
  if(!firebaseConfig.projectId) throw new Error("Missing firebase credentials: projectId");
  if(!firebaseConfig.storageBucket) throw new Error("Missing firebase credentials: storageBucket");
  if(!firebaseConfig.messagingSenderId) throw new Error("Missing firebase credentials: messagingSenderId");
  if(!firebaseConfig.appId) throw new Error("Missing firebase credentials: apiId");
  if(!firebaseConfig.measurementId) throw new Error("Missing firebase credentials: measurementID");

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { app, db, collection, getDocs, Timestamp, addDoc, deleteDoc, doc };
  export { query, orderBy, limit, where, onSnapshot };
 