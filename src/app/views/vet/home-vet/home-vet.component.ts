import { Component } from '@angular/core';
import {DecodedToken} from "../../../core/auth/schema/decoded-token.interface";
import {PetOwnerSchemaGet} from "../../../core/PetOwner/schema/petowner.interface";
import {AuthService} from "../../../core/auth/services/auth.service";
import {PetOwnerService} from "../../../core/PetOwner/services/pet-owner.service";
import {VeterinarianSchemaResponse} from "../../../core/Veterinarian/schema/veterinarian.interface";
import {VeterinarianService} from "../../../core/Veterinarian/services/veterinarian.service";
import {AppointmentSchemaGet} from "../../../core/Appointment/schema/appointment.interface";
import {AppointmentService} from "../../../core/Appointment/services/appointment.service";
import {NgForOf} from "@angular/common";
import {
  AppointmentCardComponent
} from "../../../shared/views/appointments-view/components/appointment-card/appointment-card.component";

@Component({
  selector: 'app-home-vet',
  standalone: true,
  imports: [
    AppointmentCardComponent,
    NgForOf
  ],
  templateUrl: './home-vet.component.html',
  styleUrl: './home-vet.component.css'
})
export class HomeVetComponent {
  user:DecodedToken | null;
  vet:VeterinarianSchemaResponse = {} as VeterinarianSchemaResponse;
  appointments: AppointmentSchemaGet[] = [];
  constructor(
    private authService:AuthService,
    private vetService:VeterinarianService,
    private appointmentsService:AppointmentService
  ) {
    this.user = authService.decodeToken()!;
  }
  ngOnInit() {
    this.vetService.getVeterinarianById(this.user?.user_id!).subscribe((data) => {
      this.vet = data;
    });

    this.appointmentsService.getUpcomingAppointmentsByVeterinarianId(this.user?.user_id!).subscribe((data) => {
      this.appointments = data;
    });

  }
}
