import { Injectable } from '@angular/core';
import { UpetApiService } from '../../Api/UpetBackend/upet-api.service';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from '../schema/login.interface';
import { RegisterRequest } from '../schema/register.interface';
import { LoginResponse } from '../../shared/login-response.interface';
import { DecodedToken } from '../schema/decoded-token.interface';
import { jwtDecode } from 'jwt-decode';
import {UserType} from "../enum/UserType.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends UpetApiService {
  private apiUrl: string;

  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = this.buildUrl('auth');
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/sign-in`, request)
           .pipe(
              catchError((error) => this.handleError(error))
           );
  }

  register(request: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/sign-up`, request);
  }

  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
  }

  getRole(): UserType {
    const token = this.decodeToken();
    if (!token) {
      return UserType.None;
    }

    return token.user_role;
  }

  decodeToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
}
