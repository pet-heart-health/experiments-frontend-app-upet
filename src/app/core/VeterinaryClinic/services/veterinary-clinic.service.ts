import { Injectable } from '@angular/core';
import { UpetApiService } from '../../Api/UpetBackend/upet-api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { VeterinaryClinicSchemaGet, VeterinaryClinicSchemaPost } from '../schema/veterinary-clinic.interface';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryClinicService extends UpetApiService {
  private apiUrl: string;

  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = this.buildUrl('veterinary_clinics'); // Cambiar a veterinary_clinics
  }

  // Crear una clínica veterinaria
  createVeterinaryClinic(clinic: VeterinaryClinicSchemaPost): Observable<VeterinaryClinicSchemaGet> {
      return this.http.post<VeterinaryClinicSchemaGet>(this.apiUrl, clinic).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todas las clínicas veterinarias
  getVeterinaryClinics(): Observable<VeterinaryClinicSchemaGet[]> {
    return this.http.get<VeterinaryClinicSchemaGet[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Generar una contraseña única para una clínica
  generateUniquePassword(clinicId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/generate_password/${clinicId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener una clínica veterinaria por ID
  getVeterinaryClinicById(clinicId: number): Observable<VeterinaryClinicSchemaGet> {
    return this.http.get<VeterinaryClinicSchemaGet>(`${this.apiUrl}/${clinicId}`).pipe(
      catchError(this.handleError)
    );
  }


}
