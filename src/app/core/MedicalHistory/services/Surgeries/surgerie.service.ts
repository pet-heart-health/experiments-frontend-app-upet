import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { MedicalHistoryBaseService } from '../shared/medical-history-base.service';
import { SurgerySchemaRequest, SurgerySchemaResponse } from '../../schema/surgery.interface';
import { UpetApiService } from '../../../Api/UpetBackend/upet-api.service';

@Injectable({
  providedIn: 'root'
})
export class SurgerieService extends UpetApiService {
  
  private apiUrl: string;
  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = this.buildUrl('medicalhistories');
  }
  

  addSurgery(request: SurgerySchemaRequest, medicalHistoryId : number): Observable<SurgerySchemaResponse> {
    return this.http.post<SurgerySchemaResponse>(`${this.apiUrl}/${medicalHistoryId}/surgeries`, request)
      .pipe(catchError((error) => this.handleError(error)));
  }

  getAllSurgeries(medicalHistoryId : number): Observable<SurgerySchemaResponse[]> {
    return this.http.get<SurgerySchemaResponse[]>(`${this.apiUrl}/${medicalHistoryId}/surgeries`)
      .pipe(catchError((error) => this.handleError(error)));
  }
}
