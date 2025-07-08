import {Component, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { catchError, of } from 'rxjs';
import { LoginRequest } from '../../core/auth/schema/login.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginResponse } from "../../core/shared/login-response.interface";

import { navigateTo } from '../shared/auth.utils';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule,TranslatePipe,],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  captchaQuestion: string = '';
  captchaAnswer: string = '';
  expectedAnswer: number = 0;
  captchaError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.generateCaptcha();
  }

  generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    this.captchaQuestion = `${num1} + ${num2} = ?`;
    this.expectedAnswer = num1 + num2;
    this.captchaAnswer = '';
    //this.captchaError = null;
  }

  validateCaptcha(): boolean {
    const userAnswer = parseInt(this.captchaAnswer);
    if (isNaN(userAnswer) || userAnswer !== this.expectedAnswer) {
      this.captchaError = 'Respuesta incorrecta, intenta nuevamente';
      console.log('error captcha', this.captchaError);
      this.generateCaptcha();
      return false;
    }
    this.captchaError = null;
    return true;
  }

  login() {

    if (!this.validateCaptcha()) {
      return;
    }

    const request: LoginRequest = { email: this.email, password: this.password };
    this.authService.login(request).pipe(
      catchError((error) => {
        this.errorMessage = 'Error en el inicio de sesión. Por favor, inténtelo de nuevo.'; // Mensaje de error
        alert('Error en el inicio de sesión: ' + JSON.stringify(error));
        return of(null); // Puedes manejar el error de manera más sofisticada si lo deseas
      })
    ).subscribe((response: LoginResponse | null) => {
      if (response) {
        alert('Login successful');
        navigateTo(response.access_token, this.router, this.authService);
      }
    });
  }
}
