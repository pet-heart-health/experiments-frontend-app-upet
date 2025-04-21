import { Injectable } from '@angular/core';
import { UpetApiService } from '../../Api/UpetBackend/upet-api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {PetSchemaRequest, PetSchemaResponse } from '../schema/pet.interface';

@Injectable({
  providedIn: 'root'
})
export class PetService extends UpetApiService {
  private apiUrl: string;

  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = this.buildUrl('pets'); // Cambiar a pets
  }

  // Crear una mascota
  createPet(petOwnerId: number, pet: PetSchemaRequest): Observable<PetSchemaResponse> {
    return this.http.post<PetSchemaResponse>(`${this.apiUrl}/${petOwnerId}`, pet).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todas las mascotas
  getPets(): Observable<PetSchemaResponse[]> {
    return this.http.get<PetSchemaResponse[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener mascotas por ID de propietario
  getPetsByOwner(petOwnerId: number): Observable<PetSchemaResponse[]> {
    return this.http.get<PetSchemaResponse[]>(`${this.apiUrl}/${petOwnerId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar una mascota
  updatePet(petId: number, pet: PetSchemaRequest): Observable<PetSchemaResponse> {
    return this.http.put<PetSchemaResponse>(`${this.apiUrl}/${petId}`, pet).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener una mascota por ID
  getPetById(petId: number): Observable<PetSchemaResponse> {
    return this.http.get<PetSchemaResponse>(`${this.apiUrl}/pet/${petId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar una mascota
  deletePet(petId: number): Observable<PetSchemaResponse> {
    return this.http.delete<PetSchemaResponse>(`${this.apiUrl}/${petId}`).pipe(
      catchError(this.handleError)
    );
  }


}
