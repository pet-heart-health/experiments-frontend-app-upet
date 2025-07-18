import { HttpClient } from '@angular/common/http';
import { UpetApiService } from '../../../Api/UpetBackend/upet-api.service';
import { DiseasesService } from '../Disease/disease.service';
import { VaccineService } from '../Vaccines/vaccine.service';
import { SurgerieService } from '../Surgeries/surgerie.service';
import { MedicResultService } from '../MedicResult/medic-result.service';
import { MedicalHistorySchemaRequest, MedicalHistorySchemaResponse } from '../../schema/medical-result.interface';
import {map, Observable, tap } from 'rxjs';
import { DiseaseSchemaRequest } from '../../schema/disease.interface';
import {Injectable} from "@angular/core";



@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryBaseService extends UpetApiService {

  protected apiUrl: string;
  protected buildMedicHistoryUrl(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}`;
  }
  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = this.buildUrl('medicalhistories');
  }

  createMedicalHistory(request: MedicalHistorySchemaRequest): Observable<MedicalHistorySchemaResponse> {
    return this.http.post<MedicalHistorySchemaResponse>(this.apiUrl, request);
  }

  getAllMedicalHistories(): Observable<MedicalHistorySchemaResponse[]> {
    return this.http.get<MedicalHistorySchemaResponse[]>(this.apiUrl);
  }

  getMedicalHistoryByPetId(petId: number): Observable<MedicalHistorySchemaResponse> {
    return this.http.get<MedicalHistorySchemaResponse>(`${this.apiUrl}/pet/${petId}`);
  }

  getMedicalHistory(medicalHistoryId: number): Observable<MedicalHistorySchemaResponse> {
    return this.http.get<MedicalHistorySchemaResponse>(`${this.apiUrl}/${medicalHistoryId}`);
  }

  downloadMedicalPDF(petId: number): Observable<Blob> {
    const url = `${this.getBaseUrl()}/pets/${petId}/medical-report`;

    return this.http.get(url, {
      responseType: 'blob',
      observe: 'response'
    }).pipe(
      tap(response => {
        console.log('Content-Type:', response.headers.get('Content-Type'));
      }),
      map(response => {
        const blob = response.body;
        if (blob && blob.type !== 'application/pdf') {
          return new Blob([blob], { type: 'application/pdf' });
        }
        return blob as Blob;
      })
    );
  }





}
