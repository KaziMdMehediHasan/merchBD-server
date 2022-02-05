// const firebase = require("firebase");
// const firebaseConfig = {
//   apiKey: "AIzaSyD72eKlphaeanbUHRJBCpiwTZMbvUMFgvA",
//   authDomain: "parlour-1bcf7.firebaseapp.com",
//   projectId: "parlour-1bcf7",
//   storageBucket: "parlour-1bcf7.appspot.com",
//   messagingSenderId: "156839114244",
//   appId: "1:156839114244:web:51cd05370ec4f5d4bbe751"
// };

// firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();
// const User = db.collection('Users');

// module.exports = Users;

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";


const firebaseApp = initializeApp({
  apiKey: "AIzaSyD72eKlphaeanbUHRJBCpiwTZMbvUMFgvA",
  authDomain: "parlour-1bcf7.firebaseapp.com",
  projectId: "parlour-1bcf7",
  storageBucket: "parlour-1bcf7.appspot.com",
  messagingSenderId: "156839114244",
  appId: "1:156839114244:web:51cd05370ec4f5d4bbe751",
});

const db = getFirestore();
