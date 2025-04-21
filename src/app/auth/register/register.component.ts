import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../core/auth/services/auth.service';
import {RegisterRequest} from "../../core/auth/schema/register.interface";
import {UserType} from "../../core/auth/enum/UserType.enum";
import {navigateTo} from "../shared/auth.utils";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles = ['Veterinarian', 'Pet Owner'];
  submitted = false;  // Para controlar el estado de envío del formulario

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  register(){
    console.log('Form Submitted', this.registerForm.value);

    const role:UserType = this.registerForm.value.role=='Pet Owner'?UserType.Owner:UserType.Vet;
    const body:RegisterRequest = {
      name: this.registerForm.value.fullName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      userType: role
    }
    this.authService.register(body)
    .subscribe((response) => {
      alert('Registro exitoso');
      navigateTo(response.access_token, this.router, this.authService);
    },
    (error) => {  // Manejo de errores
      alert('Error en el registro'+ JSON.stringify(error));
    }
  );
  }

  onSubmit() {
    this.submitted = true;  // Cambia el estado de envío a verdadero
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
      this.register();
    } else {
      console.log('Form is invalid');
    }
  }
}
