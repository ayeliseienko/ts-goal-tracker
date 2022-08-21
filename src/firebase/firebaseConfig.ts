import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyACE3OmgrtAICGQU8Ku6D-tHGfPppz-I0U',
  authDomain: 'goal-tracking-app-50002.firebaseapp.com',
  projectId: 'goal-tracking-app-50002',
  storageBucket: 'goal-tracking-app-50002.appspot.com',
  messagingSenderId: '663233925550',
  appId: '1:663233925550:web:71b9b1e79a10ca32e9383f',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;
