import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from './database-service-account.json';

@Injectable()
export class DatabaseService {
  private firestore: FirebaseFirestore.Firestore;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    this.firestore = admin.firestore();
  }

  getFirestore() {
    return this.firestore;
  }
}
