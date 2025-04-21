import {Component, Input} from '@angular/core';
import { VeterinarianProfileSchemaResponse, VeterinarianSchemaResponse } from '../../../core/Veterinarian/schema/veterinarian.interface';
import { VeterinaryClinicService } from '../../../core/VeterinaryClinic/services/veterinary-clinic.service';
import { VeterinaryClinicSchemaGet } from '../../../core/VeterinaryClinic/schema/veterinary-clinic.interface';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-vet-card',
  standalone: true,
  imports: [],
  templateUrl: './vet-card.component.html',
  styleUrl: './vet-card.component.css'
})
export class VetCardComponent {
  @Input() vet!: VeterinarianSchemaResponse;

  constructor(private router:Router,private vetClinicService: VeterinaryClinicService, private activateRoute:ActivatedRoute) {}
  navigateToVetProfile() {
    this.router.navigate([this.vet.id], {relativeTo: this.activateRoute}).then(p=>p);
  }

}
