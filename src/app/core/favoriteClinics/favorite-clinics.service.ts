import { Injectable } from '@angular/core';
import {UpetApiService} from "../Api/UpetBackend/upet-api.service";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {VeterinaryClinicSchemaGet} from "../VeterinaryClinic/schema/veterinary-clinic.interface";

@Injectable({
  providedIn: 'root'
})
export class FavoriteClinicsService extends UpetApiService{
  private apiUrl: string;

  constructor(private httpClient:HttpClient) {
    super(httpClient);
    this.apiUrl = this.buildUrl("favoriteClinics");
  }

  // Method to add a clinic to favorites a specific user in local storage
  toggle(userId: number, clinicId: number): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/userId/${userId}/clinicId/${clinicId}`, {});
  }

  getFavoriteClinics(userId: number): Observable<VeterinaryClinicSchemaGet[]> {
      return this.httpClient.get<VeterinaryClinicSchemaGet[]>(`${this.apiUrl}/userId/${userId}`)
        .pipe(
          catchError(error => {
            return of([]);
          })
        );;
  }

  isClinicFavorite(userId: number, clinicId: number): Observable<boolean> {
    return this.getFavoriteClinics(userId).pipe(
      map((clinics: VeterinaryClinicSchemaGet[]) => {
        return clinics.some(clinic => clinic.id === clinicId);
      })
    );
  }



}
