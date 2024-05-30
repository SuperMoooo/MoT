import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBlpvsF8r_yOq20Sj5kEYqtqyoskvbe6hQ',
    authDomain: 'MoT.firebaseapp.com',
    projectId: 'motnotifications',
    storageBucket: 'motnotifications.appspot.com',
    messagingSenderId: '454983975813',
    appId: '1:454983975813:android:0e89ce04692c5f6c80faec',
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore and Storage
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
