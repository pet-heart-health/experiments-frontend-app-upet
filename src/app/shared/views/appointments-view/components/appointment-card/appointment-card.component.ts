import {Component, Input} from '@angular/core';
import {AppointmentSchemaGet} from "../../../../../core/Appointment/schema/appointment.interface";
import {VeterinarianService} from "../../../../../core/Veterinarian/services/veterinarian.service";
import {PetService} from "../../../../../core/Pet/services/pet.service";
import {PetSchemaResponse} from "../../../../../core/Pet/schema/pet.interface";
import {VeterinarianSchemaResponse} from "../../../../../core/Veterinarian/schema/veterinarian.interface";
import {formatDateToMonth, formatTimeTo12Hour} from "../../../../../shared/helpers/date.formater";
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {AppointmentDetailsComponent} from "../appointment-details/appointment-details.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    AppointmentDetailsComponent
  ],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.css'
})
export class AppointmentCardComponent {
  @Input() appointment!: AppointmentSchemaGet;
  @Input() isPast!: boolean;

  pet:PetSchemaResponse = {} as PetSchemaResponse;
  vet:VeterinarianSchemaResponse = {} as VeterinarianSchemaResponse;
  customAppointment:AppointmentSchemaGet = {} as AppointmentSchemaGet;

  visibleDetails:boolean = false;

  constructor(
    private vetService:VeterinarianService,
    private petService:PetService,
    private router:Router
  ) {
  }

  ngOnInit() {
    this.customAppointment = {...this.appointment};
    this.customAppointment.start_time = formatTimeTo12Hour(this.appointment.start_time);
    this.customAppointment.end_time = formatTimeTo12Hour(this.appointment.end_time);
    this.customAppointment.date_day = formatDateToMonth(new Date(this.appointment.date_day));

    this.petService.getPetById(this.appointment.pet_id)
      .subscribe(pet => this.pet = pet);

    this.vetService.getVeterinarianById(this.appointment.veterinarian_id)
      .subscribe(vet => this.vet = vet);
  }

  openDetails() {
    this.visibleDetails = true;
  }
  closeDetails = () => {
    this.visibleDetails = false;
  }

}
