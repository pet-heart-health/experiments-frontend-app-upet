import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VeterinaryClinicService } from '../../core/VeterinaryClinic/services/veterinary-clinic.service';
import { VeterinarianService } from '../../core/Veterinarian/services/veterinarian.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { VeterinarianSchemaRequest, VeterinarianSchemaResponse } from '../../core/Veterinarian/schema/veterinarian.interface';
import { LoginResponse } from '../../core/shared/login-response.interface';
import { navigateTo } from '../shared/auth.utils';
import { VeterinaryClinicSchemaGet, VeterinaryClinicSchemaPost } from '../../core/VeterinaryClinic/schema/veterinary-clinic.interface';

@Component({
  selector: 'app-vet-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vet-register.component.html',
  styleUrl: './vet-register.component.css'
})
export class VetRegisterComponent {
// Estado del formulario
isVetRegister: boolean = true; // true para el formulario del veterinario, false para el de la clínica

// Datos para el registro del veterinario
clinicName: string = '';
otp_password: string = '';

// Datos para el registro de la clínica
name: string = '';
location: string = '';
phone_number: string = '';
description: string = '';
office_hours_start: string = '';
office_hours_end: string = '';

// Método para alternar entre formularios
// Método para alternar entre formularios

constructor(
  private authService: AuthService,
  private router: Router,
  private vetService: VeterinarianService,
  private clinicService: VeterinaryClinicService) {}


// Método de registro para veterinario
registerVet(clinicName : string = this.clinicName, otp_password : string = this.otp_password) {

  const vetData: VeterinarianSchemaRequest = {
    clinicName: clinicName,
    otp_password: otp_password,
  };
  // Aquí puedes hacer la llamada a tu servicio para registrar al veterinario
  console.log('Register Vet:', vetData);
  const user_id = this.authService.decodeToken()?.user_id;
  if (user_id !== undefined) {
    this.vetService.createVeterinarian(user_id, vetData).subscribe(
      (response: LoginResponse) => {
        console.log('Veterinarian registered', response);
        navigateTo(response.access_token, this.router, this.authService);
    } , (error) => {
      console.error('Error registering veterinarian', error);
    });
  } else {
    console.error('User ID is undefined');
  }
}

// Método de registro para clínica
registerClinic() {
  const clinicData : VeterinaryClinicSchemaPost = {
    name: this.name,
    location: this.location,
    phone_number: this.phone_number,
    description: this.description,
    office_hours_start: this.office_hours_start,
    office_hours_end: this.office_hours_end,
  };

  // Aquí puedes hacer la llamada a tu servicio para registrar la clínica
  console.log('Register Clinic:', clinicData);
  this.clinicService.createVeterinaryClinic(clinicData).subscribe(
    (response: VeterinaryClinicSchemaGet) => {
      alert('Clinic registered');

      this.clinicService.generateUniquePassword(response.id).subscribe(
        (password: string) => {
          this.otp_password = password;
          const vetData: VeterinarianSchemaRequest = {
            clinicName: response.name,
            otp_password: password
          };

          this.registerVet(vetData.clinicName, vetData.otp_password);
        },
        (error) => {
          alert('Error generating unique password');
        }
      );


    } , (error) => {
      alert('Error registering clinic');
    });

}

registerVeterinarian() {
  console.log('Registering veterinarian...');
}

showVetForm() {
  this.isVetRegister = true;
}

showClinicForm() {
  this.isVetRegister = false;
}

toggleForm() {
  this.isVetRegister = !this.isVetRegister;
}

}
