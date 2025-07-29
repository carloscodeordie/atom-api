import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class DatabaseService {
  private firestore: FirebaseFirestore.Firestore;

  constructor() {
    const serviceAccountPath = path.resolve(
      __dirname,
      '../config/firebase-service-account.json',
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });

    this.firestore = admin.firestore();
  }

  getFirestore() {
    return this.firestore;
  }
}
