import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";
import {PetDate} from "../../interfaces/petDate";

@Component({
  selector: 'app-list-historial-dates',
  standalone: true,
  imports: [
    Button,
    TableModule
  ],
  templateUrl: './list-historial-dates.component.html',
  styleUrl: './list-historial-dates.component.css'
})
export class ListHistorialDatesComponent implements OnInit{

  petDates!: PetDate[];

  ngOnInit(): void {
    this.petDates = [
      {
        date: '2021-09-01',
        veterinary: 'PerryPet',
        vetPhoto: 'https://centromedicoabc.com/nuevas_fotos/11334.jpg',
        petId: 1,
        petName: 'Android TV',
        petOwnerId: 1,
        petPhoto: 'https://definicion.de/wp-content/uploads/2013/03/perro-1.jpg'
      },
      {
        date: '2021-09-02',
        veterinary: 'PerryPet',
        vetPhoto: 'https://centromedicoabc.com/nuevas_fotos/11334.jpg',
        petId: 2,
        petName: 'Air Conditioner',
        petOwnerId: 1,
        petPhoto: 'https://definicion.de/wp-content/uploads/2013/03/perro-1.jpg'
      },
      {
        date: '2021-09-03',
        veterinary: 'PerryPet',
        vetPhoto: 'https://centromedicoabc.com/nuevas_fotos/11334.jpg',
        petId: 3,
        petName: 'Purifier',
        petOwnerId: 1,
        petPhoto: 'https://traindee.com/wp-content/uploads/labrador-retriever-black-dog-breed-1-400x400.jpg'
      }
    ]
  }

}
