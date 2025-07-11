import { Component } from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {NgForOf} from "@angular/common";
import {VetCardComponent} from "../../../../../shared/components/vet-card/vet-card.component";
import { PetCardComponent } from '../../../../../shared/components/pet-card/pet-card.component';
import { FormAddPetComponent } from '../form-add-pet/form-add-pet.component';
import { VeterinarianProfileSchemaResponse, VeterinarianSchemaResponse } from '../../../../../core/Veterinarian/schema/veterinarian.interface';
import { VeterinarianService } from '../../../../../core/Veterinarian/services/veterinarian.service';
import {ClinicCardComponent} from "../../../../../shared/components/clinic-card/clinic-card.component";
import {Router} from "@angular/router";
import {VeterinaryClinicService} from "../../../../../core/VeterinaryClinic/services/veterinary-clinic.service";
import {VetClinicResponse} from "../../../../../core/networking/response/VetClinicResponse";
import {TranslatePipe} from "@ngx-translate/core";
import {FavoriteClinicsService} from "../../../../../core/favoriteClinics/favorite-clinics.service";
import {AuthService} from "../../../../../core/auth/services/auth.service";

@Component({
  selector: 'app-list-scpecialists-nearby',
  standalone: true,
  imports: [
    DialogModule,
    FormAddPetComponent,
    NgForOf,
    PetCardComponent,
    VetCardComponent,
    ClinicCardComponent,
    TranslatePipe
  ],
  templateUrl: './list-scpecialists-nearby.component.html',
  styleUrl: './list-scpecialists-nearby.component.css'
})
export class ListScpecialistsNearbyComponent {
  clinics : VetClinicResponse[] = [];

  constructor(
    private favoriteClinics:FavoriteClinicsService,
    private authService:AuthService,
    private router:Router

  ) {
    let userId = this.authService.decodeToken()?.user_id;
    this.favoriteClinics = favoriteClinics;
    favoriteClinics.getFavoriteClinics(userId!).subscribe((data: VetClinicResponse[]) => {
      this.clinics = data;
    });
  }

  redirectToAllClinics() {
    this.router.navigate(['/pet-owner/favorite-clinics']).then(r=>r);
  }

}
