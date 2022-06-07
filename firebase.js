// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp, getApp, getApps} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAY7Tk5ZEwL0zLOgki6j9s9GBZQgeSNxRk",
    authDomain: "twitter-clone-830bd.firebaseapp.com",
    projectId: "twitter-clone-830bd",
    storageBucket: "twitter-clone-830bd.appspot.com",
    messagingSenderId: "115457105305",
    appId: "1:115457105305:web:5229e13f21adc71cfbc708",
    measurementId: "G-M8ZLN3KD4L"
  };

//   initialize firebase
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore();
  const storage = getStorage();

  export default app;
  export {db, storage};