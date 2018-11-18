import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "AIzaSyCMUJG7XoHEF9_wCEO89R0ss7s8N2x5JS8",
  authDomain: "erapot-7a9c5.firebaseapp.com",
  databaseURL: "https://erapot-7a9c5.firebaseio.com",
  projectId: "erapot-7a9c5",
  storageBucket: "erapot-7a9c5.appspot.com",
  messagingSenderId: "234662287317"
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
};

db.settings(settings);

// firebase collections
const usersCollection = db.collection("users");
export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
};
