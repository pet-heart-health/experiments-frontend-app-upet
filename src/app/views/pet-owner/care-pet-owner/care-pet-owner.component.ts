import { Component } from '@angular/core';
import {ListHistorialPetComponent} from "./components/list-historial-pet/list-historial-pet.component";
import {ListHistorialDatesComponent} from "./components/list-historial-dates/list-historial-dates.component";

@Component({
  selector: 'app-care-pet-owner',
  standalone: true,
  imports: [
    ListHistorialPetComponent,
    ListHistorialDatesComponent
  ],
  templateUrl: './care-pet-owner.component.html',
  styleUrl: './care-pet-owner.component.css'
})
export class CarePetOwnerComponent {

}
