import { Routes } from '@angular/router';
import {PET_OWNER_ROUTES} from "./views/pet-owner/pet-owner.routes";
import {AUTH_ROUTES} from "./auth/auth.routes";
import {VET_ROUTES} from "./views/vet/vet.routes";

export const routes: Routes = [
  ...AUTH_ROUTES,
  ...PET_OWNER_ROUTES,
  ...VET_ROUTES,
  {path: '**', redirectTo: 'pet-owner/home'}
];
