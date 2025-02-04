import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
const userId = 'user-' + Date.now() + '-' + Math.floor(Math.random() * 10000);

export function initializeFirebase() {
    if (!app) {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
    }
}

export async function logInteraction(eventType: string, details: any) {
    if (!db) return;
    
    try {
        await addDoc(collection(db, 'linked-list'), {
            userId,
            eventType,
            details,
            timestamp: serverTimestamp()
        });
        console.log(`Logged: ${eventType}`, details);
    } catch (error) {
        console.error("Error logging interaction: ", error);
    }
}