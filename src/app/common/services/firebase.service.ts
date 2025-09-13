import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  firestore: Firestore;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.firestore = getFirestore(app);
  }
}