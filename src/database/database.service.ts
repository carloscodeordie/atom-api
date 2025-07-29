import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private firestore: FirebaseFirestore.Firestore;

  onModuleInit() {
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
