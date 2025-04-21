import {Component, Input} from '@angular/core';
import {Button} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DividerModule} from "primeng/divider";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {formatDateToYYYYMMDD} from "../../../../helpers/date.formater";
import { SurgerySchemaRequest, SurgerySchemaResponse } from '../../../../../core/MedicalHistory/schema/surgery.interface';
import { MedicalHistoryBaseService } from '../../../../../core/MedicalHistory/services/shared/medical-history-base.service';
import { SurgerieService } from '../../../../../core/MedicalHistory/services/Surgeries/surgerie.service';

@Component({
  selector: 'app-surgeries',
  standalone: true,
  imports: [
    Button,
    CalendarModule,
    DividerModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    NgForOf,
    PaginatorModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './surgeries.component.html',
  styleUrl: './surgeries.component.css'
})
export class SurgeriesComponent {
  surgeries:SurgerySchemaResponse[] = [];
  @Input() medicalHistoryId: number | undefined;
  myForm:FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private surgerieService: SurgerieService
  ) {
  }
  ngOnInit() {

    this.surgerieService.getAllSurgeries(this.medicalHistoryId!)
      .subscribe((results: SurgerySchemaResponse[]) => {
        this.surgeries = results.reverse();
      });
    this.myForm = this.fb.group({
      surgeryDate: [new Date()],
      description: [''],
    });
  }
  submit(){
    let request:SurgerySchemaRequest = {
      surgeryDate: formatDateToYYYYMMDD(this.myForm.value.surgeryDate),
      description: this.myForm.value.description,
      medicalHistoryId: this.medicalHistoryId!
    }
    this.surgerieService.addSurgery(request, this.medicalHistoryId!)?.subscribe(() => {
        alert('Surgery created successfully');
        window.location.reload();
      });
  }
}
