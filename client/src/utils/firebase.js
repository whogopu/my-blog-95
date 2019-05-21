import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC7KBRRnNUxYmKTEnPvX_4sfv5IFwabon4",
  authDomain: "userlogin-74bd0.firebaseapp.com",
  databaseURL: "https://userlogin-74bd0.firebaseio.com",
  projectId: "userlogin-74bd0",
  storageBucket: "userlogin-74bd0.appspot.com",
  messagingSenderId: "577670193813",
  appId: "1:577670193813:web:46137d5413018f3c"
};

firebase.initializeApp(firebaseConfig);

export const ref = firebase.database().ref();
export const auth = firebase.auth;
export const googleProvider = new firebase.auth.GoogleAuthProvider();
