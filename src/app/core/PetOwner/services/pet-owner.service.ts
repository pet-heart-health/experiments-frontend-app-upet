import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpetApiService } from '../../Api/UpetBackend/upet-api.service';
import { catchError, Observable, throwError } from 'rxjs';
import { PetOwnerSchemaGet, PetOwnerSchemaPost, PetOwnerUpdateInformation } from '../schema/petowner.interface';
import { LoginResponse } from '../../shared/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PetOwnerService extends UpetApiService {
  apiUrl: string;

  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = this.buildUrl('petowners'); 
  }

    // Method to create a new pet owner
    createPetOwner(userId: number, petOwnerData: PetOwnerSchemaPost): Observable<LoginResponse> {
      return this.http.post<LoginResponse>(`${this.apiUrl}/${userId}`, petOwnerData).pipe(
        catchError(this.handleError)
      );
    }
  
    // Method to retrieve all pet owners
    getPetOwners(): Observable<PetOwnerSchemaGet[]> {
      return this.http.get<PetOwnerSchemaGet[]>(this.apiUrl).pipe(
        catchError(this.handleError)
      );
    }
  
    // Method to retrieve a pet owner by user ID
    getPetOwnerByUserId(userId: number): Observable<PetOwnerSchemaGet> {
      return this.http.get<PetOwnerSchemaGet>(`${this.apiUrl}/users/${userId}`).pipe(
        catchError(this.handleError)
      );
    }
  
    // Method to retrieve a pet owner by their ID
    getPetOwnerById(petOwnerId: number): Observable<PetOwnerSchemaGet> {
      return this.http.get<PetOwnerSchemaGet>(`${this.apiUrl}/${petOwnerId}`).pipe(
        catchError(this.handleError)
      );
    }
  
    // Method to update a pet owner's information
    updatePetOwner(petOwnerId: number, petOwnerData: PetOwnerUpdateInformation): Observable<PetOwnerSchemaGet> {
      return this.http.put<PetOwnerSchemaGet>(`${this.apiUrl}/${petOwnerId}`, petOwnerData).pipe(
        catchError(this.handleError)
      );
    }



}

