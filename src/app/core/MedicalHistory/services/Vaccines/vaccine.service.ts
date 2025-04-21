import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { VaccineSchemaRequest, VaccineSchemaResponse } from '../../schema/vaccine.interface';
import { MedicalHistoryBaseService } from '../shared/medical-history-base.service';
import { UpetApiService } from '../../../Api/UpetBackend/upet-api.service';

@Injectable({
  providedIn: 'root'
})
export class VaccineService extends UpetApiService {
  private apiUrl: string;

  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = this.buildUrl('medicalhistories');
  }

  addVaccine(request: VaccineSchemaRequest, medicalHistoryId: number): Observable<VaccineSchemaResponse> {
    return this.http.post<VaccineSchemaResponse>(`${this.apiUrl}/${medicalHistoryId}/vaccines`, request)
      .pipe(catchError((error) => this.handleError(error)));
  }

  getAllVaccines(medicalHistoryId: number): Observable<VaccineSchemaResponse[]> {
    return this.http.get<VaccineSchemaResponse[]>(`${this.apiUrl}/${medicalHistoryId}/vaccines`)
      .pipe(catchError((error) => this.handleError(error)));
  }
}
