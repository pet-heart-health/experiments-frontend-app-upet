import { Component } from '@angular/core';
import {VeterinaryClinicService} from "../../../core/VeterinaryClinic/services/veterinary-clinic.service";
import {VeterinaryClinicSchemaGet} from "../../../core/VeterinaryClinic/schema/veterinary-clinic.interface";
import {ActivatedRoute} from "@angular/router";
import {JsonPipe, NgForOf} from "@angular/common";
import {VetCardComponent} from "../../components/vet-card/vet-card.component";
import {VeterinarianService} from "../../../core/Veterinarian/services/veterinarian.service";
import {VeterinarianSchemaResponse} from "../../../core/Veterinarian/schema/veterinarian.interface";

@Component({
  selector: 'app-clinic-profile',
  standalone: true,
  imports: [
    JsonPipe,
    VetCardComponent,
    NgForOf
  ],
  templateUrl: './clinic-profile.component.html',
  styleUrl: './clinic-profile.component.css'
})
export class ClinicProfileComponent {
  clinic:VeterinaryClinicSchemaGet = {} as VeterinaryClinicSchemaGet;
  vets:VeterinarianSchemaResponse[] = [];

  constructor(
    private veterinayClinicService:VeterinaryClinicService,
    private veterinarianService:VeterinarianService,
    private activateRoute:ActivatedRoute
    ) {

  }

  ngOnInit() {
    let clinicId = this.activateRoute.snapshot.params['id'];
    this.veterinayClinicService.getVeterinaryClinicById(clinicId).subscribe(clinic => {
      this.clinic = clinic;
    });
    this.veterinarianService.getVetsByClinicId(clinicId).subscribe(vets => {
      this.vets = vets;
    });
  }
}
