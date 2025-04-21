import {Component, inject, Input} from '@angular/core';
import {AppointmentSchemaGet} from "../../../../../core/Appointment/schema/appointment.interface";
import {PetSchemaResponse} from "../../../../../core/Pet/schema/pet.interface";
import {VeterinarianSchemaResponse} from "../../../../../core/Veterinarian/schema/veterinarian.interface";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../core/auth/services/auth.service";
import {UserType} from "../../../../../core/auth/enum/UserType.enum";

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [
    FormsModule,
    InputTextareaModule,
    ReactiveFormsModule
  ],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent {
  @Input() appointment!: AppointmentSchemaGet;
  @Input() pet!: PetSchemaResponse;
  @Input() vet!: VeterinarianSchemaResponse;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  navigateToVetProfile = () => {
    const role = this.authService.getRole();

    if (role == UserType.Owner)
      this.router.navigate([`/pet-owner/clinics/${this.vet.clinicId}/${this.vet.id}`]).then(p => p);
    if (role == UserType.Vet)
      this.router.navigate([`/vets/${this.vet.id}`]).then(p => p);
    else
      console.log('Role not found');
  }
  navigateToPetProfile = () => {
    const role = this.authService.getRole();

    if (role == UserType.Owner)
      this.router.navigate([`/pet-owner/pets/${this.pet.id}`]).then(p => p);
    if (role == UserType.Vet)
      this.router.navigate([`/vets/pets/${this.pet.id}`]).then(p => p);
    else
      console.log('Role not found');
  }
}
