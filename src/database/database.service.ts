import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class DatabaseService {
  private firestore: FirebaseFirestore.Firestore;

  constructor() {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Missing Firebase environment variables');
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });

    this.firestore = admin.firestore();
  }

  getFirestore() {
    return this.firestore;
  }
}
