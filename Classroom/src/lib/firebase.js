import firebase from "firebase";
import "firebase/firestore";
//this contains the firebase details
const firebaseConfig = {
    apiKey: "AIzaSyAYzDDcCDQKEDmmC3almgGFMhKvcJtYvso",
    authDomain: "engage-classroom-780d7.firebaseapp.com",
    projectId: "engage-classroom-780d7",
    storageBucket: "engage-classroom-780d7.appspot.com",
    messagingSenderId: "324705587975",
    appId: "1:324705587975:web:2bec4db54ff105ad04eba2",
    measurementId: "G-3QX2VSWSP7"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;