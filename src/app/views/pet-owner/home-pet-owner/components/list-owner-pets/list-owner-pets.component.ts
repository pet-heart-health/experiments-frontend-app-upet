import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {PetResponse} from "../../interfaces/PetResponse";

import {NgForOf} from "@angular/common";
import {HomePetOwnerService} from "../../services/home-pet-owner.service";
import {FormAddPetComponent} from "../form-add-pet/form-add-pet.component";
import {DialogModule} from "primeng/dialog";
import {TypeForm} from "../../interfaces/type-form.enum";
import {PetCardComponent} from "../../../../../shared/components/pet-card/pet-card.component";
import {Router} from "@angular/router";
import { PetSchemaResponse } from '../../../../../core/Pet/schema/pet.interface';
import { PetService } from '../../../../../core/Pet/services/pet.service';
import {DecodedToken} from "../../../../../core/auth/schema/decoded-token.interface";
import {AuthService} from "../../../../../core/auth/services/auth.service";
import {PetOwnerSchemaGet} from "../../../../../core/PetOwner/schema/petowner.interface";
import {PetOwnerService} from "../../../../../core/PetOwner/services/pet-owner.service";

@Component({
  selector: 'app-list-owner-pets',
  standalone: true,
  imports: [
    PetCardComponent,
    NgForOf,
    FormAddPetComponent,
    DialogModule
  ],
  templateUrl: './list-owner-pets.component.html',
  styleUrl: './list-owner-pets.component.css'
})
export class ListOwnerPetsComponent {
  pets:PetSchemaResponse[] = [];
  visibleAddPet:boolean = false;
  user:DecodedToken | null;

  constructor(
    private petsApiService: PetService,
    private router: Router,
    private authService:AuthService,
    private petOwnerService:PetOwnerService
  ) {
    this.user = authService.decodeToken()!;
  }

  ngOnInit() {
      this.petsApiService.getPetsByOwner(this.user?.user_id!).subscribe((pets) => {
        this.pets = pets;
      });
  }

  openDialogAddPet() {
    this.visibleAddPet = true;
  }

  closeDialogAddPet = () => {
    this.visibleAddPet = false;
  }

  redirectToAllPets() {
    this.router.navigate(['/pet-owner/pets']).then(r => r);
  }

  protected readonly TypeForm = TypeForm;
}
