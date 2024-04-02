// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { /* connectFirestoreEmulator, */ getFirestore } from 'firebase/firestore';
import { /* connectStorageEmulator, */ getStorage } from 'firebase/storage';
// import { isDev } from '../isDev';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBIUTIzqsPQ0sNV0Rg--HpPNyGYn9oMDSU",
    authDomain: "taskmesite2.firebaseapp.com",
    projectId: "taskmesite2",
    storageBucket: "taskmesite2.appspot.com",
    messagingSenderId: "44122836013",
    appId: "1:44122836013:web:24edbb8c9f3a671c40fca4",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);
export const baseBucketName = 'taskmesite';

/* if (isDev) {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8081);
} */
