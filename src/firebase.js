import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyAQBcWdS7CBg9Ak6WMKlGjN_wPgWhzNqO4",
    authDomain: "etask-b8fec.firebaseapp.com",
    databaseURL: "https://etask-b8fec.firebaseio.com",
    projectId: "etask-b8fec",
    storageBucket: "etask-b8fec.appspot.com",
    messagingSenderId: "34316862310",
    appId: "1:34316862310:web:d83cd82b244ca768c27ea7"
});

export { firebaseConfig as firebase};