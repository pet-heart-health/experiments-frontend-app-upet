import {Route} from "@angular/router";
import {PetProfileViewComponent} from "../../shared/views/pet-profile-view/pet-profile-view.component";
import {VetLayoutComponent} from "./vet-layout/vet-layout.component";
import {HomeVetComponent} from "./home-vet/home-vet.component";
import {AppointmentsViewComponent} from "../../shared/views/appointments-view/appointments-view.component";
import {ReviewsVetComponent} from "./reviews-vet/reviews-vet.component";
import {ProfileVetComponent} from "./profile-vet/profile-vet.component";
import {NotificationsViewComponent} from "../../shared/views/notifications-view/notifications-view.component";

export const VET_ROUTES: Route[] = [
  {
    path: "vets", component: VetLayoutComponent, children: [
      {
        path: 'home', component: HomeVetComponent
      },
      {
        path: 'pets/:id', component: PetProfileViewComponent
      },
      {
        path:'booking', component:AppointmentsViewComponent
      },
      {
        path:'reviews', component:ReviewsVetComponent
      },
      {
        path:'profile', component:ProfileVetComponent
      },
      {
        path: 'notifications',component:NotificationsViewComponent
      }
    ]
  },
]
