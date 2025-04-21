import {Component, Input} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {NgForOf, NgIf} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {formatDateToYYYYMMDD} from "../../../../helpers/date.formater";
import { MedicalHistoryBaseService } from '../../../../../core/MedicalHistory/services/shared/medical-history-base.service';
import { MedicalHistorySchemaRequest, MedicalHistorySchemaResponse } from '../../../../../core/MedicalHistory/schema/medical-result.interface';
import { MedicResultService } from '../../../../../core/MedicalHistory/services/MedicResult/medic-result.service';

@Component({
  selector: 'app-medical-results',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    CalendarModule,
    NgForOf,
    DividerModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './medical-results.component.html',
  styleUrl: './medical-results.component.css'
})
export class MedicalResultsComponent {
  medicalResults: MedicalHistorySchemaResponse[] = []
  @Input() medicalHistoryId: number | undefined;
  myForm:FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private resultService:MedicResultService
  ) {
  }
  ngOnInit() {

      this.resultService.getAllMedicalHistories(this.medicalHistoryId!)
        .subscribe((results: MedicalHistorySchemaResponse[]) => {
          this.medicalResults = results.reverse();
        });

      this.myForm = this.fb.group({
        resultDate: [new Date()],
        resultType: [''],
        description: ['']
      });
  }

  submit() {
    let request:MedicalHistorySchemaRequest = {
      medicalHistoryId: this.medicalHistoryId!,
      resultDate: formatDateToYYYYMMDD(this.myForm.value.resultDate),
      resultType: this.myForm.value.resultType,
      description: this.myForm.value.description
    }
    this.resultService.createMedicalHistory(request, this.medicalHistoryId!)
      .subscribe(() => {
        alert('Medical result created successfully');
        window.location.reload();
      });
  }
}
