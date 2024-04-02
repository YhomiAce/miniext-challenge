// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { /* connectFirestoreEmulator, */ getFirestore } from 'firebase/firestore';
import { /* connectStorageEmulator, */ getStorage } from 'firebase/storage';
// import { isDev } from '../isDev';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*
    NOTE: Work around for error "OPERATION_NOT_ALLOWED : Please verify the new email before changing email."

    uncheck Email enumeration protection in firebase
    Authentication / settings / User actions
 **/
const firebaseConfig = {
    apiKey: 'FILL_ME_IN',
    authDomain: 'FILL_ME_IN',
    projectId: 'FILL_ME_IN',
    storageBucket: 'FILL_ME_IN',
    messagingSenderId: 'FILL_ME_IN',
    appId: 'FILL_ME_IN',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);
export const baseBucketName = 'FILL_ME_IN';

/* if (isDev) {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8081);
} */
