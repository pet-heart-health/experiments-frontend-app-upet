import { Injectable } from '@angular/core';
import { UpetApiService } from '../../Api/UpetBackend/upet-api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginResponse } from '../../shared/login-response.interface';
import { VeterinarianUpdateInformation, VeterinarianSchemaResponse, VeterinarianSchemaRequest, VeterinarianProfileSchemaResponse } from '../schema/veterinarian.interface';

@Injectable({
  providedIn: 'root'
})
export class VeterinarianService extends UpetApiService {
  private apiUrl: string;

  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = this.buildUrl('veterinarians'); // Cambiar a veterinarians
  }

  // Crear un veterinario
  createVeterinarian(userId: number, veterinarian: VeterinarianSchemaRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/${userId}`, veterinarian).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todos los veterinarios
  getVeterinarians(): Observable<VeterinarianSchemaResponse[]> {
    return this.http.get<VeterinarianSchemaResponse[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener un veterinario por ID de usuario
  getVeterinarianByUserId(userId: number): Observable<VeterinarianSchemaResponse> {
    return this.http.get<VeterinarianSchemaResponse>(`${this.apiUrl}/users/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener un veterinario por ID
  getVeterinarianById(vetId: number): Observable<VeterinarianSchemaResponse> {
    return this.http.get<VeterinarianSchemaResponse>(`${this.apiUrl}/${vetId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener veterinarios por ID de clínica
  getVetsByClinicId(clinicId: number): Observable<VeterinarianSchemaResponse[]> {
    return this.http.get<VeterinarianSchemaResponse[]>(`${this.apiUrl}/vets/${clinicId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener detalles de un veterinario
  getVetByIdDetails(vetId: number): Observable<VeterinarianProfileSchemaResponse> {
    return this.http.get<VeterinarianProfileSchemaResponse>(`${this.apiUrl}/reviews/${vetId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener horarios disponibles de un veterinario
  getAvailableTimes(vetId: number, availabilityData: { date:string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/{vet_id}/available_times?clinic_id=${vetId}`, availabilityData).pipe(
      catchError(this.handleError)
    );
  }

  // Cambiar información de un veterinario
  changeVetInformation(vetId: number, vetData: VeterinarianUpdateInformation): Observable<VeterinarianSchemaResponse> {
    return this.http.put<VeterinarianSchemaResponse>(`${this.apiUrl}/${vetId}`, vetData).pipe(
      catchError(this.handleError)
    );
  }


}
