import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpetApiService } from '../../../Api/UpetBackend/upet-api.service';
import { MedicalHistorySchemaRequest, MedicalHistorySchemaResponse } from '../../schema/medical-result.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicResultService extends UpetApiService {
  protected apiUrl: string;

  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = this.buildUrl('medicalhistories');
  }

  createMedicalHistory(request: MedicalHistorySchemaRequest, medicalHistoryId: number): Observable<MedicalHistorySchemaResponse> {
    return this.http.post<MedicalHistorySchemaResponse>(`${this.apiUrl}/${medicalHistoryId}/medicalresults`, request);
  }

  getAllMedicalHistories(medicalHistoryId: number): Observable<MedicalHistorySchemaResponse[]> {
    return this.http.get<MedicalHistorySchemaResponse[]>(`${this.apiUrl}/${medicalHistoryId}/medicalresults`);
  }


}
