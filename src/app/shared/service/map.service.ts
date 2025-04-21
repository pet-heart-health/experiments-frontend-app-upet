import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private apiKey = 'AIzaSyA5EVv7ZhM6q0Dlgsy9bRyFL-rDKb0DAYY'; // Reemplaza con tu clave de API de Google Maps
  private apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  constructor(private http: HttpClient) {}

  getAddressFromCoordinates(lat: string, lng: string): Observable<string> {
    const url = `${this.apiUrl}?latlng=${lat},${lng}&key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.results && response.results.length > 0) {
          return response.results[0].formatted_address;
        } else {
          return 'Dirección no encontrada';
        }
      })
    );
  }
  getCoordinatesFromAddress(address: string): Observable<string> {
    const url = `${this.apiUrl}?address=${address}&key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.results && response.results.length > 0) {
          const location = response.results[0].geometry.location;
          return `${location.lat},${location.lng}`;
        } else {
          return '0,0';
        }
      })
    );
  }
}
