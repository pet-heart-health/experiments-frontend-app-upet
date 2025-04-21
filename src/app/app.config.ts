import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MessageService} from "primeng/api";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {firebaseConfig} from "./shared/config/firebase.config";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    MessageService,
    provideStorage(
      () => getStorage()),
    provideFirebaseApp(() =>
      initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()
    ),
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig },

  ]
};
