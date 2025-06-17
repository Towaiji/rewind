import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAoeLl6IuaPaKXDSla6QC2Rc3cxAPvNWvs",
  authDomain: "rewind-bb4eb.firebaseapp.com",
  projectId: "rewind-bb4eb",
  storageBucket: "rewind-bb4eb.firebasestorage.app",
  messagingSenderId: "523214406021",
  appId: "1:523214406021:web:6b96e4eb79eca4ac6a04ec"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
