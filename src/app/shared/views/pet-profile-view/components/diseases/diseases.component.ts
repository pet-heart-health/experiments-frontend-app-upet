import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {NgForOf, NgIf} from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

import { formatDateToYYYYMMDD } from '../../../../helpers/date.formater';
import { DiseaseSchemaRequest, DiseaseSchemaResponse } from '../../../../../core/MedicalHistory/schema/disease.interface';
import { MedicalHistoryBaseService } from '../../../../../core/MedicalHistory/services/shared/medical-history-base.service';
import { DiseasesService } from '../../../../../core/MedicalHistory/services/Disease/disease.service';

@Component({
  selector: 'app-diseases',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    DividerModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    NgForOf,
    PaginatorModule,
    NgIf
  ],
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.css']
})
export class DiseasesComponent implements OnInit {
  diseases: DiseaseSchemaResponse[] = [];

  myForm: FormGroup;

  @Input() medicalHistoryId!: number;

  constructor(
    private diseaseService:DiseasesService
  ) {
    // Usando FormGroup y FormControl directamente
    this.myForm = new FormGroup({
      name: new FormControl(''),
      diagnosisDate: new FormControl(new Date()),
      severity: new FormControl('')
    });
  }

  ngOnInit() {
    this.diseaseService.getAllDiseases(this.medicalHistoryId).subscribe((results: DiseaseSchemaResponse[]) => {
      this.diseases = results.reverse();
    });
  }

  submit() {
    if (this.myForm.valid && this.medicalHistoryId) {
      let request: DiseaseSchemaRequest = {
        name: this.myForm.value.name,
        diagnosisDate: formatDateToYYYYMMDD(this.myForm.value.diagnosisDate),
        severity: this.myForm.value.severity,
        medicalHistoryId: this.medicalHistoryId
      };
      this.diseaseService.addDisease(request, this.medicalHistoryId).subscribe(() => {
        alert('Disease created');
        window.location.reload();
      }, (error: any) => {
        console.error('Error creating disease:', error);
      });
    } else {
      alert('Please fill out the form correctly');
    }
  }
}
