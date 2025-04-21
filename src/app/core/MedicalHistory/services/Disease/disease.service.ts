import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { DiseaseSchemaRequest, DiseaseSchemaResponse } from '../../schema/disease.interface';
import { MedicalHistoryBaseService } from '../shared/medical-history-base.service';
import { Inject, Injectable, OnInit } from '@angular/core';
import { UpetApiService } from '../../../Api/UpetBackend/upet-api.service';

@Injectable({
  providedIn: 'root'
})

export class DiseasesService extends UpetApiService  {
  
  private apiUrl: string;
  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = this.buildUrl('medicalhistories');

  }
  
  addDisease(request: DiseaseSchemaRequest, medicalHistoryId: number): Observable<DiseaseSchemaResponse> {
    return this.http.post<DiseaseSchemaResponse>(`${this.apiUrl}/${medicalHistoryId}/diseases`, request)
      .pipe(catchError((error) => this.handleError(error)));
  }

  getAllDiseases(medicalHistoryId: number): Observable<DiseaseSchemaResponse[]> {
    return this.http.get<DiseaseSchemaResponse[]>(`${this.apiUrl}/${medicalHistoryId}/diseases`)
      .pipe(catchError((error) => this.handleError(error)));
  }
}
