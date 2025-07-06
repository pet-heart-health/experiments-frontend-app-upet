import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MessageService} from "primeng/api";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {firebaseConfig} from "./shared/config/firebase.config";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {provideTranslateService, TranslateLoader, TranslateModule} from "@ngx-translate/core";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    importProvidersFrom(
      TranslateModule.forRoot(
        {
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }
      )
    )
  ]
};
