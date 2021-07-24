 import firebase from "firebase";

 var firebaseConfig = {
    apiKey: "AIzaSyBEVl_BFHJKbP4JJEA5UjVZqjlg0e-BiNE",
    authDomain: "messenger-3b9a1.firebaseapp.com",
    projectId: "messenger-3b9a1",
    storageBucket: "messenger-3b9a1.appspot.com",
    messagingSenderId: "258099366269",
    appId: "1:258099366269:web:8f199b86a75028875e2414"
  };


const firebaseApp= firebase.initializeApp(firebaseConfig);
const db= firebaseApp.firestore();
const auth=firebase.auth();
  export {auth, db} ;
