import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyDubYirK69YM__8B9FlDQnDgf7fkFmbKzw",
  authDomain: "studentassistant-4f1f8.firebaseapp.com",
  databaseURL: "https://studentassistant-4f1f8.firebaseio.com",
  projectId: "studentassistant-4f1f8",
  storageBucket: "studentassistant-4f1f8.appspot.com",
  messagingSenderId: "505170415034",
  appId: "1:505170415034:web:552bd139944ac1b6c56183"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;