import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import { TableModule } from 'primeng/table';
import {PetHistory} from "../../interfaces/petHistory";
@Component({
  selector: 'app-list-historial-pet',
  standalone: true,
  imports: [Button, TableModule ],
  templateUrl: './list-historial-pet.component.html',
  styleUrl: './list-historial-pet.component.css'
})
export class ListHistorialPetComponent implements OnInit{

  petHistories!: PetHistory[];

  constructor() {
  }
  ngOnInit() {
    // static data: pet's name, photo, typeOfDating, date FOR 3 PETS
    this.petHistories = [
      {
        date: '2021-09-01',
        type: 'Vaccinations',
        petId: 1,
        petName: 'Android TV',
        petOwnerId: 1,
        petPhoto: 'https://definicion.de/wp-content/uploads/2013/03/perro-1.jpg'
      },
      {
        date: '2021-09-02',
        type: 'Results',
        petId: 2,
        petName: 'Air Conditioner',
        petOwnerId: 1,
        petPhoto: 'https://definicion.de/wp-content/uploads/2013/03/perro-1.jpg'
      },
      {
        date: '2021-09-03',
        type: 'Surgeries',
        petId: 3,
        petName: 'Purifier',
        petOwnerId: 1,
        petPhoto: 'https://traindee.com/wp-content/uploads/labrador-retriever-black-dog-breed-1-400x400.jpg'
      }
    ]
  }

}
