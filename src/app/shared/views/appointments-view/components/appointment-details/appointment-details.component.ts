import {Component, inject, Input} from '@angular/core';
import {
  AppointmentSchemaGet,
  AppointmentSchemaUpdate
} from "../../../../../core/Appointment/schema/appointment.interface";
import {PetSchemaResponse} from "../../../../../core/Pet/schema/pet.interface";
import {
  VeterinarianSchemaResponse,
  VeterinarianUpdateInformation
} from "../../../../../core/Veterinarian/schema/veterinarian.interface";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../core/auth/services/auth.service";
import {UserType} from "../../../../../core/auth/enum/UserType.enum";
import {AppointmentService} from "../../../../../core/Appointment/services/appointment.service";
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [
    FormsModule,
    InputTextareaModule,
    ReactiveFormsModule,
    Button,
    DialogModule,
    FileUploadModule,
    FloatLabelModule,
    InputTextModule,
    NgIf,
    ToastModule
  ],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent {
  @Input() appointment!: AppointmentSchemaGet;
  @Input() pet!: PetSchemaResponse;
  @Input() vet!: VeterinarianSchemaResponse;
  dialogVisible: boolean = false;
  myForm:FormGroup;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.myForm = this.fb.group({
      diagnosis: "",
      treatment: "",
    })
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
  openDialog() {
    this.dialogVisible = true;
  }
  async submitForm() {
    const body:AppointmentSchemaUpdate = {
      diagnosis: this.myForm.value.diagnosis,
      treatment: this.myForm.value.treatment
    }
    console.log({body});
    this.appointmentService.updateAppointment(this.appointment.id, body).subscribe(() => {

      alert('Appointment updated successfully');
      this.closeDialog();
    });
  }
  closeDialog() {
    this.dialogVisible = false;
  }

  cancel(){
    const body:AppointmentSchemaUpdate = {
      diagnosis: 'Cancelado',
      treatment: 'Cancelado'
    }
    console.log({body});
    this.appointmentService.cancelAppointment(this.appointment.id, body).subscribe(() => {

      alert('Appointment cancelled successfully');
    });
  }
}
