import {PetOwnerLayoutComponent} from "./pet-owner-layout/pet-owner-layout.component";
import {Route} from "@angular/router";
import {HomePetOwnerComponent} from "./home-pet-owner/home-pet-owner.component";
import {CarePetOwnerComponent} from "./care-pet-owner/care-pet-owner.component";
import {PetsPetOwnerComponent} from "./pets-pet-owner/pets-pet-owner.component";
import {PetProfileViewComponent} from "../../shared/views/pet-profile-view/pet-profile-view.component";
import {ClinicsPetOwnerComponent} from "./clinics-pet-owner/clinics-pet-owner.component";
import {ClinicProfileComponent} from "../../shared/views/clinic-profile/clinic-profile.component";
import {VetPublicProfileComponent} from "../../shared/views/vet-public-profile/vet-public-profile.component";
import {ProfilePetOwnerComponent} from "./profile-pet-owner/profile-pet-owner.component";
import {AppointmentsViewComponent} from "../../shared/views/appointments-view/appointments-view.component";
import {NotificationsViewComponent} from "../../shared/views/notifications-view/notifications-view.component";

export const PET_OWNER_ROUTES: Route[] = [
  {
    path: "pet-owner", component: PetOwnerLayoutComponent, children: [
      {
        path: 'home', component: HomePetOwnerComponent
      },
      {
        path: 'care', component: CarePetOwnerComponent
      },
      {
        path: 'pets', component: PetsPetOwnerComponent
      },
      {
        path: 'pets/:id', component: PetProfileViewComponent
      },
      {
        path: 'clinics', component:ClinicsPetOwnerComponent
      },
      {
        path:'clinics/:id', component:ClinicProfileComponent
      },
      {
        path: 'clinics/:id/:vetId', component:VetPublicProfileComponent
      },
      {
        path: 'appointments',component:AppointmentsViewComponent
      },
      {
        path:'profile',component:ProfilePetOwnerComponent
      },
      {
        path: 'notifications',component:NotificationsViewComponent
      }
    ]
  },
]

