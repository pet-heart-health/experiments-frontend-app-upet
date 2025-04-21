import { Injectable } from '@angular/core';
import { UpetApiService } from '../../Api/UpetBackend/upet-api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AppointmentSchemaGet, AppointmentSchemaCreate } from '../schema/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends UpetApiService {
  private apiUrl: string;

  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = this.buildUrl('appointments'); // Cambiar a appointments
  }

  // Obtener todas las citas
  getAppointments(): Observable<AppointmentSchemaGet[]> {
    return this.http.get<AppointmentSchemaGet[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener citas por ID de propietario
  getAppointmentsByOwnerId(ownerId: number): Observable<AppointmentSchemaGet[]> {
    return this.http.get<AppointmentSchemaGet[]>(`${this.apiUrl}/owner/${ownerId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener una cita por ID
  getAppointmentById(appointmentId: number): Observable<AppointmentSchemaGet> {
    return this.http.get<AppointmentSchemaGet>(`${this.apiUrl}/${appointmentId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener citas por ID de mascota
  getAppointmentsByPetId(petId: number): Observable<AppointmentSchemaGet[]> {
    return this.http.get<AppointmentSchemaGet[]>(`${this.apiUrl}/pet/${petId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener citas por ID de veterinario
  getAppointmentsByVeterinarianId(veterinarianId: number): Observable<AppointmentSchemaGet[]> {
    return this.http.get<AppointmentSchemaGet[]>(`${this.apiUrl}/veterinarian/${veterinarianId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Crear una cita
  createAppointment(appointment: AppointmentSchemaCreate): Observable<AppointmentSchemaGet> {
    return this.http.post<AppointmentSchemaGet>(this.apiUrl, appointment).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener citas futuras por ID de propietario
  getUpcomingAppointmentsByOwnerId(ownerId: number): Observable<AppointmentSchemaGet[]> {
    return this.http.get<AppointmentSchemaGet[]>(`${this.apiUrl}/owner/${ownerId}/upcoming`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener citas pasadas por ID de propietario
  getPastAppointmentsByOwnerId(ownerId: number): Observable<AppointmentSchemaGet[]> {
    return this.http.get<AppointmentSchemaGet[]>(`${this.apiUrl}/owner/${ownerId}/past`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener citas futuras por ID de veterinario
  getUpcomingAppointmentsByVeterinarianId(veterinarianId: number): Observable<AppointmentSchemaGet[]> {
    return this.http.get<AppointmentSchemaGet[]>(`${this.apiUrl}/veterinarian/${veterinarianId}/upcoming`).pipe(
      catchError(this.handleError)
    );
  }
  getPastAppointmentsByVeterinarianId(veterinarianId: number): Observable<AppointmentSchemaGet[]> {
    return this.http.get<AppointmentSchemaGet[]>(`${this.apiUrl}/veterinarian/${veterinarianId}/past`).pipe(
      catchError(this.handleError)
    );
  }

}

