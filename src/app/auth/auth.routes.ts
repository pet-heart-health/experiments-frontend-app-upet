import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";
import { PetOwnerRegisterComponent } from "./pet-owner-register/pet-owner-register.component";
import { VetRegisterComponent } from "./vet-register/vet-register.component";

export const AUTH_ROUTES: Routes =[
{
    path: 'auth', component: AuthLayoutComponent, children: [
        {path: 'login', component: LoginComponent },
        {path: 'register', component: RegisterComponent},
        {path: 'pet-owner', component: PetOwnerRegisterComponent},
        {path: 'vet', component: VetRegisterComponent}
    ]
},
]
